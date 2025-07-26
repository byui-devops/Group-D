from django.test import TestCase

# Create your tests here.
import pytest
from django.urls import reverse
from django.test import Client
from django.contrib.auth.models import User
from src.CashCat.models import Transaction

@pytest.fixture
def client():
    return Client()

@pytest.fixture
def user(db):
    return User.objects.create_user(username="testuser", password="testpass123")

@pytest.fixture
def logged_in_client(client, user):
    client.login(username="testuser", password="testpass123")
    return client

# Unit Tests for Models
@pytest.mark.django_db
def test_transaction_creation(user):
    transaction = Transaction.objects.create(
        user=user,
        category="Groceries",
        amount=50.75,
        description="Weekly shopping",
        transaction_type="expense"
    )
    assert transaction.user == user
    assert transaction.category == "Groceries"
    assert transaction.amount == 50.75
    assert transaction.description == "Weekly shopping"
    assert transaction.transaction_type == "expense"
    assert str(transaction) == "expense - Groceries: $50.75"

@pytest.mark.django_db
def test_transaction_default_date(user):
    transaction = Transaction.objects.create(
        user=user,
        category="Salary",
        amount=1000.00,
        transaction_type="income"
    )
    assert transaction.date is not None

# Integration Tests for Views
@pytest.mark.django_db
def test_auth_view_unauthenticated(client):
    response = client.get(reverse('auth'))
    assert response.status_code == 200

@pytest.mark.django_db
def test_auth_view_login_success(client, user):
    response = client.post(reverse('auth'), {
        'action': 'login',
        'username': 'testuser',
        'password': 'testpass123'
    })
    assert response.status_code == 302
    assert response.url == '/dashboard/'

@pytest.mark.django_db
def test_auth_view_signup_success(client):
    response = client.post(reverse('auth'), {
        'action': 'signup',
        'username': 'newuser',
        'password': 'newpass123'
    })
    assert User.objects.filter(username='newuser').exists()
    assert response.status_code == 200

@pytest.mark.django_db
def test_dashboard_view(logged_in_client):
    Transaction.objects.create(
        user=logged_in_client.user,
        category="Rent",
        amount=1200.00,
        transaction_type="expense"
    )
    response = logged_in_client.get(reverse('dashboard'))
    assert response.status_code == 200
    assert "Rent" in str(response.content)
    assert "1200.00" in str(response.content)

@pytest.mark.django_db
def test_add_transaction_view(logged_in_client):
    response = logged_in_client.get(reverse('add_transaction'))
    assert response.status_code == 200
    response = logged_in_client.post(reverse('add_transaction'), {
        'category': 'Food',
        'amount': '30.50',
        'description': 'Dinner',
        'transaction_type': 'expense'
    })
    assert response.status_code == 302
    assert Transaction.objects.filter(category="Food").exists()

@pytest.mark.django_db
def test_edit_transaction_view(logged_in_client):
    transaction = Transaction.objects.create(
        user=logged_in_client.user,
        category="Test",
        amount=10.00,
        transaction_type="expense"
    )
    response = logged_in_client.post(reverse('edit_transaction', args=[transaction.id]), {
        'category': 'Updated',
        'amount': '20.00',
        'transaction_type': 'expense'
    })
    assert response.status_code == 302
    transaction.refresh_from_db()
    assert transaction.category == "Updated"
    assert transaction.amount == 20.00

@pytest.mark.django_db
def test_delete_transaction_view(logged_in_client):
    transaction = Transaction.objects.create(
        user=logged_in_client.user,
        category="Delete",
        amount=5.00,
        transaction_type="expense"
    )
    response = logged_in_client.post(reverse('delete_transaction', args=[transaction.id]))
    assert response.status_code == 302
    assert not Transaction.objects.filter(id=transaction.id).exists()

@pytest.mark.django_db
def test_logout_view(logged_in_client):
    response = logged_in_client.get(reverse('logout'))
    assert response.status_code == 302
    assert response.url == '/'

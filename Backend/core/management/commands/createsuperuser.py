from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

User = get_user_model()


class Command(BaseCommand):
    help = 'Create a superuser with predefined fields'
    def handle(self, *args, **options):
        if not User.objects.filter(email='admin@email.com').exists():
            User.objects.create_superuser(
                email='admin@email.com',
                password='admin',
                account_type='admin'
            )
            self.stdout.write(self.style.SUCCESS('Successfully created superuser! - login with: (admin@email.com - admin)'))
        else:
            self.stdout.write(self.style.ERROR('User already exists! - login with: (admin@email.com - admin)'))

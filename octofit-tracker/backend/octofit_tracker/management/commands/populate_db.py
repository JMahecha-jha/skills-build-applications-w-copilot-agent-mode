from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Workout, Leaderboard
from django.utils import timezone

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Clear existing data
        Activity.objects.all().delete()
        User.objects.all().delete()
        Team.objects.all().delete()
        Workout.objects.all().delete()
        Leaderboard.objects.all().delete()

        # Create teams
        Team.objects.create(name='Marvel')
        Team.objects.create(name='DC')

        # Create users (team stored as string name)
        User.objects.create(name='Tony Stark', email='tony@marvel.com', team='Marvel')
        User.objects.create(name='Steve Rogers', email='steve@marvel.com', team='Marvel')
        User.objects.create(name='Thor Odinson', email='thor@marvel.com', team='Marvel')
        User.objects.create(name='Bruce Wayne', email='bruce@dc.com', team='DC')
        User.objects.create(name='Clark Kent', email='clark@dc.com', team='DC')
        User.objects.create(name='Diana Prince', email='diana@dc.com', team='DC')

        # Create activities (user stored as email string)
        Activity.objects.create(user='tony@marvel.com', type='Running', duration=30, date=timezone.now().date())
        Activity.objects.create(user='steve@marvel.com', type='Cycling', duration=45, date=timezone.now().date())
        Activity.objects.create(user='thor@marvel.com', type='Weightlifting', duration=60, date=timezone.now().date())
        Activity.objects.create(user='bruce@dc.com', type='Swimming', duration=60, date=timezone.now().date())
        Activity.objects.create(user='clark@dc.com', type='Yoga', duration=20, date=timezone.now().date())
        Activity.objects.create(user='diana@dc.com', type='Sparring', duration=50, date=timezone.now().date())

        # Create workouts
        Workout.objects.create(name='Super Strength', description='High-intensity strength training for superheroes', suggested_for='Marvel')
        Workout.objects.create(name='Flight Training', description='Aerial agility and endurance training', suggested_for='DC')
        Workout.objects.create(name='Arc Reactor Cardio', description='Fast-paced cardio inspired by Iron Man', suggested_for='Marvel')
        Workout.objects.create(name='Kryptonian Core', description='Core strength workout inspired by Superman', suggested_for='DC')

        # Create leaderboard (team stored as string name)
        Leaderboard.objects.create(team='Marvel', points=150)
        Leaderboard.objects.create(team='DC', points=120)

        self.stdout.write(self.style.SUCCESS('Test data populated successfully.'))

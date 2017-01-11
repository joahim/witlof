import os

from django.core import management
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = u'Witlof CMS management.'

    def add_arguments(self, parser):
        parser.add_argument('command', choices=['init'])

    def handle(self, *args, **options):
        if 'init' in options['command']:
            management.call_command(
                'loaddata',
                os.path.abspath(os.path.join(__file__, '../../../fixtures/root.json'))
            )

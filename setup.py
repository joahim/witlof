from setuptools import setup

setup(
    name='witlof',
    description='Witlof is a Django CMS',
    version='0.0.1',
    url='https://github.com/joahim/witlof',
    author='Joh Dokler',
    author_email='joh.dokler@gmail.com',
    packages=['witlof'],
    install_requires=[
        'Django>=1.9',
        'psycopg2-binary>=2.8.5',
        'python-magic>=0.4.0',
        'beautifulsoup4>=4',
        'Pillow>=3',
    ],
    include_package_data=True,
)

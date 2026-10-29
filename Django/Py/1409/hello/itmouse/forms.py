from django import forms
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError

from itmouse.models import Books


class UserForm(forms.Form):
    name = forms.CharField(label="Имя пользователя")
    age = forms.IntegerField(label="Возраст пользователя")


class Form3(forms.Form):
    fname = forms.CharField(label="First name")
    lname = forms.CharField(label="Last name")
    date = forms.DateField(
        label="Date of birth",
        widget=forms.SelectDateWidget(years=range(1980, 2016))
    )
    gender = forms.ChoiceField(choices=((1, "male"), (2, "female"), (3, "other")))
    email = forms.EmailField(label="Email")
    reemail = forms.EmailField(label="Re-type Email", help_text="@ symbol required")
    password = forms.CharField(label="Password")
    address = forms.CharField(label="Address")
    city = forms.CharField(label="City")


class Form4(forms.Form):
    subjects = forms.CharField(
        label="Любимые предметы",
        min_length=2,
        max_length=100,
        widget=forms.TextInput(attrs={
            "placeholder": "Введите любимые предметы",
            "class": "subjects"
        })
    )
    hobbies = forms.CharField(
        label="Увлечения",
        min_length=2,
        max_length=100,
        widget=forms.TextInput(attrs={
            "placeholder": "Введите ваши увлечения",
            "class": "hobbies"
        })
    )
    books = forms.CharField(
        label="Любимые книги",
        min_length=2,
        max_length=100,
        widget=forms.TextInput(attrs={
            "placeholder": "Введите любимые книги",
            "class": "books"
        })
    )
    authors = forms.CharField(
        label="Любимые авторы",
        min_length=2,
        max_length=100,
        widget=forms.TextInput(attrs={
            "placeholder": "Введите любимых авторов",
            "class": "authors"
        })
    )
class Form5(forms.Form):
    name = forms.CharField(
        label="Имя",
        min_length=2,
        max_length=20,
        widget=forms.TextInput(attrs={
            "class": "name"
        })
    )
    lastname = forms.CharField(
        label="Фамилия",
        min_length=2,
        max_length=20,
        widget=forms.TextInput(attrs={
            "class": "lastname"
        })
    )
    age = forms.IntegerField(
        label="Возраст",
        min_value=0,
        max_value=120,
        widget=forms.TextInput(attrs={
            "class": "age"
        })
    )
    email = forms.EmailField(
        label="Почта",
        widget=forms.TextInput(attrs={
            "class": "email"
        })
    )
    avatar = forms.FileField(
        label="Аватарка",
        widget=forms.FileInput(
            attrs={"class": "avatar"}
        )
    )

    def clean_email(self):
        email = self.cleaned_data['email']

        domain = email.split('@')[-1] if '@' in email else ''

        allowed_endings = ('example.com', 'gmail.com', 'mail.ru')

        if domain not in allowed_endings:
            raise ValidationError('Неправильный адрес электронной почты')

        return email
class BooksForm(forms.ModelForm):
    published_date = forms.DateField(
        label="Дата публикации",
        input_formats=['%Y-%m-%d', '%d.%m.%Y'],
        widget=forms.DateInput(attrs={'type': 'date'})
    )

    class Meta:
        model = Books
        fields = ('title', 'author', 'published_date', 'isbn', 'summary')
        labels = {
            'title': 'Название',
            'author': 'Автор',
            'published_date': 'Дата публикации',
            'isbn': 'ISBN',
            'summary': 'Описание',
        }

# Formik Form Component

---

The FormikForm is a customizable, multilingual form component build with React and Formik. 
This form has been constructed with input validation in mind and features language switch between English and Romanian.

It's still a work in progress (needs updates and cleaning) - was committed in this version, so that i can learn how to 
use GitHub.

Main purpose of the project was to get familiar with Formik, the visual part will be updated in the upcoming period.


## Table of content
* [Technologies Used](#technologies-used)
* [Installation](#installation)
* [Usage](#usage)
* [Features](#features)
* [Form inputs](#form-inputs)
* [Form validation](#form-validation)
* [Language Switching](#language-switching)
* [Localization](#localization)
* [How to contribute](#how-to-contribute)

## Technologies Used
* React
* Formik
* Yup (for schema validation)

## Installation

You will need to install the following dependencies to use this components
* React (`npm install react`)
* Formik (`npm install formik`)
* Yup (`npm install yup`)

## Usage
To use the given Formik component, import it in your desire component:
```
import YoutubeForm from './YoutubeForm';
```
# Features
## Form inputs
The form includes the following inputs:
* Name (text input)
* Email (email input)
* Channel (text input)
* Address (text input)
* Comments (textarea)
* Facebook (text input)
* Twitter (text input)
* Primary Phone Number (text input)
* Secondary Phone Number (text input)
* List of additional phone numbers (text input array)

## Form validation
Form validation is done with Formik and Yup. Required fields are name, email and channel. If the user tries to submit
the form without filling these in, submit button will be disabled.

If user just visits the required field, a relevant error message will be displayed in the user's current language.

## Language Switching
This form supports language switching between English and Romanian. To change the form's language, click the button at 
the top of the form.

### Localization
The language settings for the form are imported from JSON files:
```
let engLang = require("../lang/english.json");
let roLang = require("../lang/romanian.json");
```
## How to contribute
Feel free to contribute to this project by opening a Pull Request. If you have any questions of find any bugs, please 
open an issue.

Keep in mind that this is still an ongoing project, that will be constantly updated.


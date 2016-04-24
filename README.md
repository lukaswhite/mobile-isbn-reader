Mobile ISBN Reader
=====================

A simple mobile application developed with the [Ionic Framework](http://ionicframework.com/) for reading ISBN numbers from (real!) books via their barcodes. Once you've scanned a book, it uses the [Goodreads](https://www.goodreads.com/) API to retrieve the rating of the book and displays it along with a button which links directly to the book in question on the Goodreads website.

![A screenshot of the application in action](/screenshot.png?raw=true "A screenshot of the application in action")

There are a few steps you'll need to take to get this working.

First, Run `npm install`.

Then create a file named `config.json` in the project root, which looks like this:

```
{
  "services": {
    "goodreads": {
      "key": "SUBSTITUTE-YOUR-KEY-HERE"
    }
  }
}
```

You'll need to [obtain a developer key](https://www.goodreads.com/api/keys) and substitute it in at the appropriate place.

Run the following command:

```
gulp config
```

This will generate an Angular module which encapsulates the contents of the `config.json` file you just created.

You'll need to add the appropriate platform(s):

```
ionic platform add android
ionic platform add ios
```

You also need a couple of Cordova plugins:

```
cordova plugin add https://github.com/wildabeast/BarcodeScanner.git 
ionic plugin add cordova-plugin-inappbrowser
```

With all that in place, you should be able to run it on your device:

```
ionic run android
ionic run ios
```

> The application uses a barcode reader, so obviously you need a real device to run it.


Application icon by [Sergei Kokota](https://www.iconfinder.com/Zerg) and licensed under [Creative Commons Attribution 2.5 generic](http://creativecommons.org/licenses/by/2.5/).
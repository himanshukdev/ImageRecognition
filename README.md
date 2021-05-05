# grab the coordinates.
''' A Preact web application built to extract location coordinates from images Uploaded. 
    Works with DD MM SS [N/n S/s]  DD MM SS [W/w E/e] format.
    Download the sample image in application and upload it and see how the coordinated has been extracted.
    Image Recognition was implemented using Tesseract.js
'''

## CLI Commands


# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# grab the coordinates via webcam.
'''
For grabbing coordinates via webcam.There are some protocol set by web browsers.
Like to access media devices connection should be secure.
So , There is a tool called NgRok (https://ngrok.com/download) which prepares https tunnel for a port 
within minutes.

Just use this url install NGROK , Unzip and just run , command line interpretor of ngrok will get opened.
Type there ngrok http 8080.

copy the https link and paste this in your browser.Our local app which we served with npm run dev will
be available at the https link we genreated using ngrok.
'''
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

![image](https://user-images.githubusercontent.com/70579774/117172994-f4254300-ade9-11eb-89a0-08e3c19d020b.png)

Run this application then command line interpretor will open
Type there ngrok http 8080.

![image](https://user-images.githubusercontent.com/70579774/117173282-3ea6bf80-adea-11eb-9910-f0fa47792e84.png)

Ngrok will start the https tunnel.

![image](https://user-images.githubusercontent.com/70579774/117173658-9cd3a280-adea-11eb-997e-45897dab24a1.png)


copy the https link and paste this in your browser.Our local app which we served with npm run dev will
be available at the https link we genreated using ngrok.
'''

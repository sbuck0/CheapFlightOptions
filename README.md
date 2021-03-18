# Capital One SES MindSumo Challenge 

This web application finds all the flight options for a given date, origin and destination, and currency.

## Application Usage:
Initially, when the application is started, this page appears:

![image](https://user-images.githubusercontent.com/61099636/111697259-bb1a1a80-880b-11eb-84b3-1a8754cd607e.png)


Simply input the start point of your flight, the destination of your flight, the dates of your flight, and the currency. Note that the Country and Locale are filled already. If you want to change the country or locale, you have the option to do so. Once you press submit, you will get a list of flight options. I will display a sample list (inputs: Origin = JFK-sky, Destination = SFO-sky, Outbound = anytime, Inbound = anytime, Currency = USD, and other options are not changed).

![image](https://user-images.githubusercontent.com/61099636/111697329-ccfbbd80-880b-11eb-86e2-764080a45bd5.png)

As you can see from the screenshot, you can sort the flights by different means, such as price (low to high), price (high to low), airline, and price, by simply picking the desired input in the dropdown menu and clicking reload.

You can also change the dates, origins, destination, and currency to find other flight options.



## How to Use:

In a directory that you want the application to be located write the following commmands that are in bold.

The command below clones the entire repository into your local computer.

### `git clone git clone https://github.com/sbuck0/CheapFlightOptions.git`

The command below starts the application in your default browser.

### `npm start`


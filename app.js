const SEND_EMAIL = "forevermoneer@gmail.com";

//on successful API call to generate token, inserts token into input box on page for later use
const onGetTokenSuccess = data => {
  $("#token").val(data.access_token);
};

//requests auth token from SFMC
const getToken = () => {
  $.ajax({
    type: "POST",
    url:
      "https://mc5wp718bxk52f6jvhyftb9-p5ny.auth.marketingcloudapis.com/v2/token",
    contentType: "application/x-www-form-urlencoded",
    data: {
      client_id: "b6rcpcja5cg9owbd0lfkz586",
      client_secret: "VUyGGv6Ta5yMLfvLNM2lPJCm",
      grant_type: "client_credentials"
    },
    success: onGetTokenSuccess,
    error: function(error) {
      console.log(error.responseJSON);
    }
  });
};

//general success function to use in API calls to display results
const onSuccess = data => console.log(data);

//general function to send emails, takes in the data (payload), trigger external key (to insert into url), and token generated by previous call
const sendEmail = (data, key, token) => {
  $.ajax({
    type: "POST",
    url: `https://mc5wp718bxk52f6jvhyftb9-p5ny.rest.marketingcloudapis.com/messaging/v1/messageDefinitionSends/key:${key}/send/`,
    contentType: "application/x-www-form-urlencoded",
    headers: {
      Authorization: "Bearer " + token
    },
    data: data,
    success: onSuccess,
    error: function(error) {
      console.log(error.responseJSON);
    }
  });
};

// similar to above general email functionality, altered for Journey testing
const startJourney = (data, token) => {
  $.ajax({
    type: "POST",
    url: `https://mc5wp718bxk52f6jvhyftb9-p5ny.rest.marketingcloudapis.com/interaction/v1/events`,
    contentType: "application/x-www-form-urlencoded",
    headers: {
      Authorization: "Bearer " + token
    },
    data: data,
    success: onSuccess,
    error: function(error) {
      console.log(error.responseJSON);
    }
  });
};

//functions for each email, creates data object, and passes in details to sendEmail function

// PASSWORD RESET
const sendPasswordReset = () => {
  let data = {
    To: {
      Address: SEND_EMAIL,
      SubscriberKey: SEND_EMAIL,
      ContactAttributes: {
        SubscriberAttributes: {
          EmailAddress: SEND_EMAIL,
          XML_DATA:
            "<USER><FIRSTNAME>kevena </FIRSTNAME><RESETPASSWORDURL>https://www.forever21.com/us/shop/Account/ResetPassword?id=8DcYrBYfRboBx39ENkrTo2HN/YAq+bnr&amp;str=pfoPUCroN+tln21mIgjhhPYukURj6/XE7SGz8yb6X6ix5wjbBFDzHqUt3F93SgbIf+ExOnTPkjAyh4W/XxDRiBgOTfnoo4s0MwW1NQJyh2M=</RESETPASSWORDURL><EMAIL>kmzachery@gmail.com</EMAIL></USER>"
        }
      }
    }
  };

  let token = $("#token").val();
  sendEmail(data, "PASSWORD_RESET", token);
};

// SHIPPING NOTIFICATION
const sendShipping = () => {
  let email = "michael.o@forever21.com";
  let data = {
    To: {
      Address: SEND_EMAIL,
      SubscriberKey: SEND_EMAIL,
      ContactAttributes: {
        SubscriberAttributes: {
          EmailAddress: SEND_EMAIL,
          XML_DATA:
            "<ORDER><BILLINGADDRESS><CUSTOMERNAME>Grace Dietz</CUSTOMERNAME><ADDRESS1>2513 Henry St</ADDRESS1><ADDRESS2></ADDRESS2><CITY>Sheboygan</CITY><STATE>WI</STATE><ZIPCODE>53081</ZIPCODE><PAYMETHOD>CC-4894</PAYMETHOD></BILLINGADDRESS><SHIPPINGINFORMATION><TRACKINGNUMBER>785933123042</TRACKINGNUMBER><SHIPDATE>03/09/19</SHIPDATE><TRACKINGURL>https://forever21.narvar.com/tracking/forever21/fedex?tracking_numbers=785933123042&amp;order_number=85988152&amp;ozip=90031&amp;dzip=53081&amp;service=FG</TRACKINGURL><TRACKINGURLOFCARRIER>https://www.fedex.com/apps/fedextrack/?tracknumbers=785933123042</TRACKINGURLOFCARRIER><SHIPPINGMETHOD>Standard</SHIPPINGMETHOD><CUSTOMERNAME>Grace Dietz</CUSTOMERNAME><ADDRESS1>2513 Henry St</ADDRESS1><ADDRESS2></ADDRESS2><CITY>Sheboygan</CITY><STATE>WI</STATE><ZIPCODE>53081</ZIPCODE></SHIPPINGINFORMATION><ORDERNUMBER>85988152</ORDERNUMBER><ORDERDATE>03/07/2019 19:42:12</ORDERDATE><EMAIL>gracedeeter@gmail.com</EMAIL><SUBTOTAL>126.29</SUBTOTAL><SHIPPINGTOTAL>0.00</SHIPPINGTOTAL><TAX>6.95</TAX><TOTAL>133.24</TOTAL><ITEMS><ITEM><PRODIMAGE>http://www.forever21.com/images/intl_g/00321047-02.jpg</PRODIMAGE><NAME>Topstitched Mini Skirt</NAME><PRODUCTID>2000321047</PRODUCTID><SIZECOLOR>BLACK</SIZECOLOR><QUANTITY>1</QUANTITY><EXTENDEDPRICE>8.35</EXTENDEDPRICE><OOS></OOS></ITEM><ITEM><PRODIMAGE>http://www.forever21.com/images/intl_g/00271657-03.jpg</PRODIMAGE><NAME>Chiffon Star Print Top</NAME><PRODUCTID>2000271657</PRODUCTID><SIZECOLOR>NAVY/CREAM</SIZECOLOR><QUANTITY>1</QUANTITY><EXTENDEDPRICE>8.35</EXTENDEDPRICE><OOS></OOS></ITEM><ITEM><PRODIMAGE>http://www.forever21.com/images/intl_g/00338684-03.jpg</PRODIMAGE><NAME>Button-Front Cami Dress</NAME><PRODUCTID>2000338684</PRODUCTID><SIZECOLOR>PEACH</SIZECOLOR><QUANTITY>1</QUANTITY><EXTENDEDPRICE>16.61</EXTENDEDPRICE><OOS></OOS></ITEM><ITEM><PRODIMAGE>http://www.forever21.com/images/intl_g/00337389-03.jpg</PRODIMAGE><NAME>Ribbed Knit Scrunchie</NAME><PRODUCTID>1000337389</PRODUCTID><SIZECOLOR>BLACK</SIZECOLOR><QUANTITY>1</QUANTITY><EXTENDEDPRICE>1.59</EXTENDEDPRICE><OOS></OOS></ITEM><ITEM><PRODIMAGE>http://www.forever21.com/images/intl_g/00352319-02.jpg</PRODIMAGE><NAME>Plaid Denim Mini Skirt</NAME><PRODUCTID>2000352319</PRODUCTID><SIZECOLOR>MAUVE/CREAM</SIZECOLOR><QUANTITY>1</QUANTITY><EXTENDEDPRICE>20.86</EXTENDEDPRICE><OOS></OOS></ITEM><ITEM><PRODIMAGE>http://www.forever21.com/images/intl_g/00351476-03.jpg</PRODIMAGE><NAME>Solid Twist-Front Headwrap</NAME><PRODUCTID>1000351476</PRODUCTID><SIZECOLOR>BLACK</SIZECOLOR><QUANTITY>1</QUANTITY><EXTENDEDPRICE>4.10</EXTENDEDPRICE><OOS></OOS></ITEM><ITEM><PRODIMAGE>http://www.forever21.com/images/intl_g/00326008-01.jpg</PRODIMAGE><NAME>Hammered &amp; Etched Disc Pendant Layered Necklace</NAME><PRODUCTID>1000326008</PRODUCTID><SIZECOLOR>GOLD</SIZECOLOR><QUANTITY>1</QUANTITY><EXTENDEDPRICE>5.76</EXTENDEDPRICE><OOS></OOS></ITEM><ITEM><PRODIMAGE>http://www.forever21.com/images/intl_g/00317399-01.jpg</PRODIMAGE><NAME>Longline Marled Knit Cardigan</NAME><PRODUCTID>2000317399</PRODUCTID><SIZECOLOR>PINK</SIZECOLOR><QUANTITY>1</QUANTITY><EXTENDEDPRICE>14.94</EXTENDEDPRICE><OOS></OOS></ITEM><ITEM><PRODIMAGE>http://www.forever21.com/images/intl_g/00339156-01.jpg</PRODIMAGE><NAME>Faded Denim Jacket</NAME><PRODUCTID>2000339156</PRODUCTID><SIZECOLOR>DENIM</SIZECOLOR><QUANTITY>1</QUANTITY><EXTENDEDPRICE>24.95</EXTENDEDPRICE><OOS></OOS></ITEM><ITEM><PRODIMAGE>http://www.forever21.com/images/intl_g/00323306-03.jpg</PRODIMAGE><NAME>Knotted Floral Fit &amp; Flare Dress</NAME><PRODUCTID>2000323306</PRODUCTID><SIZECOLOR>MARIGOLD/WHITE</SIZECOLOR><QUANTITY>1</QUANTITY><EXTENDEDPRICE>13.27</EXTENDEDPRICE><OOS></OOS></ITEM><ITEM><PRODIMAGE>http://www.forever21.com/images/intl_g/00293370-04.jpg</PRODIMAGE><NAME>Waffle Knit Mock Neck Top</NAME><PRODUCTID>2000293370</PRODUCTID><SIZECOLOR>CREAM</SIZECOLOR><QUANTITY>1</QUANTITY><EXTENDEDPRICE>7.51</EXTENDEDPRICE><OOS></OOS></ITEM></ITEMS></ORDER>"
        }
      }
    }
  };

  let token = $("#token").val();
  sendEmail(data, "SHIPPING_NOTIFICATION", token);
};

// COMING SOON CONFIRMATION
const comingSoonConfirmation = () => {
  let email = "michael.o@forever21.com";
  let data = {
    To: {
      Address: SEND_EMAIL,
      SubscriberKey: SEND_EMAIL,
      ContactAttributes: {
        SubscriberAttributes: {
          EmailAddress: SEND_EMAIL,
          XML_DATA:
            // MULTIPLE ITEMS
            // "<PRODITEMS> <ITEM> <PRODUCTIMAGE >http://www.forever21.com/images/intl_g/00331533-04.jpg</PRODUCTIMAGE > <PRODUCTNAME>Swim Cover-Up Maxi Dress</PRODUCTNAME> <PRODUCTPRICE>$34.9000</PRODUCTPRICE> <PRODUCTID>2000331533</PRODUCTID> <PRODUCTURL >https://www.forever21.com/us/shop/Catalog/Product/f21/dress/2000331533?</PRODUCTURL > </ITEM> <ITEM> <PRODUCTIMAGE >http://www.forever21.com/images/intl_g/00331533-04.jpg</PRODUCTIMAGE > <PRODUCTNAME>Swim Cover-Up Maxi Dress</PRODUCTNAME> <PRODUCTPRICE>$34.9000</PRODUCTPRICE> <PRODUCTID>2000331533</PRODUCTID> <PRODUCTURL >https://www.forever21.com/us/shop/Catalog/Product/f21/dress/2000331533?</PRODUCTURL > </ITEM> <ITEM> <PRODUCTIMAGE >http://www.forever21.com/images/intl_g/00331533-04.jpg</PRODUCTIMAGE > <PRODUCTNAME>Swim Cover-Up Maxi Dress</PRODUCTNAME> <PRODUCTPRICE>$34.9000</PRODUCTPRICE> <PRODUCTID>2000331533</PRODUCTID> <PRODUCTURL >https://www.forever21.com/us/shop/Catalog/Product/f21/dress/2000331533?</PRODUCTURL > </ITEM> </PRODITEMS>"

            "<PRODITEMS> <ITEM> <PRODUCTIMAGE>http://www.forever21.com/images/intl_g/00331533-04.jpg</PRODUCTIMAGE> <PRODUCTNAME>Swim Cover-Up Maxi Dress</PRODUCTNAME> <PRODUCTPRICE>$34.9000</PRODUCTPRICE> <PRODUCTID>2000331533</PRODUCTID> <PRODUCTURL>https://www.forever21.com/us/shop/Catalog/Product/f21/dress/2000331533?</PRODUCTURL> </ITEM> </PRODITEMS>"
        }
      }
    }
  };

  let token = $("#token").val();
  sendEmail(data, "COMING_SOON_CONFIRMATION", token);
};

// COMING SOON NOTIFICATION
const comingSoonNotification = () => {
  let email = "michael.o@forever21.com";
  let data = {
    To: {
      Address: SEND_EMAIL,
      SubscriberKey: SEND_EMAIL,
      ContactAttributes: {
        SubscriberAttributes: {
          EmailAddress: SEND_EMAIL,
          XML_DATA:
            "<PRODITEMS> <PRODITEMS> <ITEM> <PRODUCTIMAGE >http://www.forever21.com/images/intl_g/00273549-03.jpg</PRODUCTIMAGE > <PRODUCTNAME>No Bra Club Graphic Tee</PRODUCTNAME> <PRODUCTPRICE>$8.9</PRODUCTPRICE> <PRODUCTID>2000273549</PRODUCTID> <PRODUCTURL >https://www.forever21.com/us/shop/Catalog/Product/F21/app-main/2000273549/032</PRODUCTURL > </ITEM> <ITEM> <PRODUCTIMAGE >http://www.forever21.com/images/intl_g/00273549-03.jpg</PRODUCTIMAGE > <PRODUCTNAME>No Bra Club Graphic Tee</PRODUCTNAME> <PRODUCTPRICE>$8.9</PRODUCTPRICE> <PRODUCTID>2000273549</PRODUCTID> <PRODUCTURL >https://www.forever21.com/us/shop/Catalog/Product/F21/app-main/2000273549/032</PRODUCTURL > </ITEM> </PRODITEMS> </PRODITEMS>"

          // SINGLE ITEM
          // "<PRODITEMS> <ITEM> <PRODUCTIMAGE>http://www.forever21.com/images/intl_g/00273549-03.jpg</PRODUCTIMAGE> <PRODUCTNAME>No Bra Club Graphic Tee</PRODUCTNAME> <PRODUCTPRICE>$8.99</PRODUCTPRICE> <PRODUCTID>2000273549</PRODUCTID> <PRODUCTURL>https://www.forever21.com/us/shop/Catalog/Product/F21/app-main/2000273549/032</PRODUCTURL> </ITEM> </PRODITEMS>"
        }
      }
    }
  };

  let token = $("#token").val();
  sendEmail(data, "COMING_SOON_NOTIFICATION", token);
};

// ORDER CONFIRMATION
const sendOrder = () => {
  let data = {
    To: {
      Address: SEND_EMAIL,
      SubscriberKey: SEND_EMAIL,
      ContactAttributes: {
        SubscriberAttributes: {
          EmailAddress: SEND_EMAIL,
          XML_DATA:
            "<ORDER><BILLINGADDRESS><CUSTOMERNAME>Eric Pointer</CUSTOMERNAME><ADDRESS1>505 6TH ST SW</ADDRESS1><ADDRESS2>APT 29G</ADDRESS2><CITY>ROANOKE</CITY><STATE>VA</STATE><ZIPCODE>24016</ZIPCODE><PAYMETHOD>CC-4890</PAYMETHOD></BILLINGADDRESS><SHIPPINGINFORMATION><SHIPPINGMETHOD>Standard Shipping</SHIPPINGMETHOD><CUSTOMERNAME>Eric Pointer</CUSTOMERNAME><ADDRESS1>505 6TH ST SW</ADDRESS1><ADDRESS2>APT 29G</ADDRESS2><CITY>ROANOKE</CITY><STATE>VA</STATE><ZIPCODE>24016</ZIPCODE></SHIPPINGINFORMATION><ORDERNUMBER>83237967</ORDERNUMBER><ORDERDATE>11/26/2018 00:00:16</ORDERDATE><SUBTOTAL>37.12</SUBTOTAL><SHIPPINGTOTAL>0.00</SHIPPINGTOTAL><TAX>1.97</TAX><TOTAL>39.09</TOTAL><EMAIL>kkitka@salesforce.com</EMAIL><USERUID>622A43FF-85BB-4F1D-9D88-8AD58F4586C9</USERUID><PAYMENT><GIFTCARDTOTALAMOUNT>0.00</GIFTCARDTOTALAMOUNT><CREDITCARDTOTALAMOUNT>39.09</CREDITCARDTOTALAMOUNT><PAYPALTOTALAMOUNT>0.00</PAYPALTOTALAMOUNT></PAYMENT><ITEMS><ITEM><PRODIMAGE>http://www.forever21.com/images/intl_g/00342056-01.jpg</PRODIMAGE><NAME>Embroidered Polka Dot Dress</NAME><PRODUCTID>2000342056012</PRODUCTID><SIZECOLOR>SMALL,IVORY/BLACK</SIZECOLOR><QUANTITY>1</QUANTITY><EXTENDEDPRICE>22.90</EXTENDEDPRICE></ITEM><ITEM><PRODIMAGE>http://www.forever21.com/images/intl_g/00348483-03.jpg</PRODIMAGE><NAME>Floral Button-Front Fit &amp; Flare Dress</NAME><PRODUCTID>2000348483032</PRODUCTID><SIZECOLOR>SMALL,IVORY/PINK</SIZECOLOR><QUANTITY>1</QUANTITY><EXTENDEDPRICE>17.90</EXTENDEDPRICE></ITEM><ITEM><PRODIMAGE>http://www.forever21.com/images/intl_g/00366277-01.jpg</PRODIMAGE><NAME>Ditsy Floral Mini Dress</NAME><PRODUCTID>2000366277012</PRODUCTID><SIZECOLOR>SMALL,BLACK/MULTI</SIZECOLOR><QUANTITY>1</QUANTITY><EXTENDEDPRICE>24.90</EXTENDEDPRICE></ITEM></ITEMS></ORDER>"
        }
      }
    }
  };

  let token = $("#token").val();
  sendEmail(data, "ORDER_CONFIRMATION", token);
};

// GENERAL TRANSACTION
const sendGeneral = () => {
  let data = {
    To: {
      Address: SEND_EMAIL,
      SubscriberKey: SEND_EMAIL,
      ContactAttributes: {
        SubscriberAttributes: {
          EmailAddress: SEND_EMAIL,
          XML_DATA:
            "<GENERAL> <EMAILSUBJECT> Forever21 Order Cancellation Notification - [85490047] </EMAILSUBJECT> <EMAILTITLE> Order Cancellation </EMAILTITLE> <EMAILCONTENT> <![CDATA[Dear Customer, <br><br>Your request to cancel your order has been approved.<br>Any pending authorizations reflected in your account should void within 24 hours, but may vary depending on your financial institution or credit card company.<br><br>]]> </EMAILCONTENT> </GENERAL>"
        }
      }
    }
  };

  let token = $("#token").val();
  sendEmail(data, "GENERAL_TRANSACTION", token);
};

// E GIFT SENDER
const eGiftSender = () => {
  let email = "michael.o@forever21.com";
  let data = {
    To: {
      Address: SEND_EMAIL,
      SubscriberKey: SEND_EMAIL,
      ContactAttributes: {
        SubscriberAttributes: {
          EmailAddress: SEND_EMAIL,
          XML_DATA:
            "<EGIFT><SENDER><FROMNAME>Valerie Tengco</FROMNAME><TOEMAIL>Ryane.k.nubla@gmail.com</TOEMAIL><CARDIMAGE>https://www.forever21.com/images/f21/us/egift/email_large/00000001-65.jpg</CARDIMAGE></SENDER></EGIFT>"
        }
      }
    }
  };

  let token = $("#token").val();
  sendEmail(data, "EGIFT_SENDER", token);
};

// E GIFT RECEIVER
const eGiftReceiver = () => {
  let email = "michael.o@forever21.com";
  let data = {
    To: {
      Address: SEND_EMAIL,
      SubscriberKey: SEND_EMAIL,
      ContactAttributes: {
        SubscriberAttributes: {
          EmailAddress: SEND_EMAIL,
          XML_DATA:
            "<EGIFT> <RECEIVER> <EGIFTNUMBER>100446791151268463 </EGIFTNUMBER> <PINNUMBER>91987029</PINNUMBER> <TONAME>Anndrea Williams</TONAME> <FROMNAME>Sophia Burgess</FROMNAME> <FROMEMAIL>SNBSWEETHEART@YAHOO.COM</FROMEMAIL> <AMOUNT>50</AMOUNT> <MESSAGE>Hope you had a great birthday weekend and i pray that God continue to bless your sweet days with many more. I love you cuz, Forever!</MESSAGE> <CARDIMAGE>https://www.forever21.com/images/f21/us/egift/email_large/00000001-59.jpg</CARDIMAGE> </RECEIVER> </EGIFT>"
        }
      }
    }
  };

  let token = $("#token").val();
  sendEmail(data, "EGIFT_RECEIVER", token);
};

// OUT OF STOCK FRONTEND
const outOfStockFront = () => {
  let email = "michael.o@forever21.com";
  let data = {
    To: {
      Address: SEND_EMAIL,
      SubscriberKey: SEND_EMAIL,
      ContactAttributes: {
        SubscriberAttributes: {
          EmailAddress: SEND_EMAIL,
          XML_DATA:
            // MULTIPLE ITEMS
            // "<OOS> <ITEMS> <ITEM> <BRAND>F21</BRAND> <PRODUCTNAME>Flounce Tube Crop Top</PRODUCTNAME> <PRICE>22</PRICE> <COLOR>TOMATO</COLOR> <SIZE>Large</SIZE><PRODUCTID>2000297779</PRODUCTID><PRODUCTIMAGE>http://www.forever21.com/images/intl_g/00297779-02.jpg</PRODUCTIMAGE> </ITEM> <ITEM> <BRAND>F21</BRAND> <PRODUCTNAME>Lace-Trim Bodysuit</PRODUCTNAME> <PRICE>12.9</PRICE> <COLOR>YELLOW</COLOR><SIZE>Medium</SIZE> <PRODUCTID>2000281146</PRODUCTID><PRODUCTIMAGE>http://www.forever21.com/images/intl_g/00281146-05.jpg</PRODUCTIMAGE> </ITEM> <ITEM> <BRAND>F21</BRAND> <PRODUCTNAME>Lace-Trim Bodysuit</PRODUCTNAME> <PRICE>12.9</PRICE> <COLOR>YELLOW</COLOR><SIZE>Large</SIZE> <PRODUCTID>2000281146</PRODUCTID><PRODUCTIMAGE>http://www.forever21.com/images/intl_g/00281146-05.jpg</PRODUCTIMAGE> </ITEM> </ITEMS> </OOS>"

            // SINGLE ITEM
            "<OOS> <ITEMS><ITEM> <BRAND>F21</BRAND> <PRODUCTNAME>Lace-Trim Bodysuit</PRODUCTNAME> <PRICE>12.9</PRICE> <COLOR>YELLOW</COLOR> <SIZE>Medium</SIZE> <PRODUCTID>2000281146</PRODUCTID> <PRODUCTIMAGE>http://www.forever21.com/images/intl_g/00281146-05.jpg</PRODUCTIMAGE> </ITEM></ITEMS> </OOS>"
        }
      }
    }
  };

  let token = $("#token").val();
  sendEmail(data, "OUT_OF_STOCK_FRONTEND", token);
};

// OUT OF STOCK BACKEND
const outOfStockBack = () => {
  let email = "michael.o@forever21.com";
  let data = {
    To: {
      Address: SEND_EMAIL,
      SubscriberKey: SEND_EMAIL,
      ContactAttributes: {
        SubscriberAttributes: {
          EmailAddress: SEND_EMAIL,
          XML_DATA:
            // SINGLE ITEM
            // "<OOS><ORDER><CUSTOMERNAME>fatima diaz</CUSTOMERNAME><ORDERNUMBER>84761904</ORDERNUMBER><ITEMS><ITEM><NAME>Men Xray Mesh-Knit Sneakers</NAME><PRODUCTID>2000339899</PRODUCTID><QUANTITY>1</QUANTITY><EXTENDEDPRICE>32</EXTENDEDPRICE><PRODUCTIMAGE>http://www.forever21.com/images/intl_g/00339899-01.jpg</PRODUCTIMAGE></ITEM></ITEMS></ORDER></OOS>"

            // MULTIPLE ITEMS
            "<OOS ><ORDER ><CUSTOMERNAME>fatima diaz</CUSTOMERNAME><ORDERNUMBER>84761904</ORDERNUMBER ><ITEMS ><ITEM ><NAME>Men Xray Mesh-Knit Sneakers</NAME ><PRODUCTID>2000339899</PRODUCTID><QUANTITY>1</QUANTITY ><EXTENDEDPRICE>32</EXTENDEDPRICE ><PRODUCTIMAGE >http://www.forever21.com/images/intl_g/00339899-01.jpg</PRODUCTIMAGE ></ITEM > <ITEM ><NAME>Men Xray Mesh-Knit Sneakers</NAME ><PRODUCTID>2000339899</PRODUCTID><QUANTITY>1</QUANTITY ><EXTENDEDPRICE>32</EXTENDEDPRICE ><PRODUCTIMAGE >http://www.forever21.com/images/intl_g/00339899-01.jpg</PRODUCTIMAGE ></ITEM > <ITEM ><NAME>Men Xray Mesh-Knit Sneakers</NAME ><PRODUCTID>2000339899</PRODUCTID><QUANTITY>1</QUANTITY ><EXTENDEDPRICE>32</EXTENDEDPRICE ><PRODUCTIMAGE >http://www.forever21.com/images/intl_g/00339899-01.jpg</PRODUCTIMAGE ></ITEM > </ITEMS ></ORDER ></OOS >"
        }
      }
    }
  };

  let token = $("#token").val();
  sendEmail(data, "OUT_OF_STOCK_BACKEND", token);
};

// BACK IN STOCK
const backInStock = () => {
  let email = "michael.o@forever21.com";
  let data = {
    To: {
      Address: SEND_EMAIL,
      SubscriberKey: SEND_EMAIL,
      ContactAttributes: {
        SubscriberAttributes: {
          EmailAddress: SEND_EMAIL,
          XML_DATA:
            // SINGLE ITEM
            // "<BIS><ITEMS><ITEM><BRAND>F21</BRAND><PRODUCTNAME>Floral Lace Bralette</PRODUCTNAME><PRICE>10.9</PRICE><COLOR>BLACK</COLOR><SIZE>Small</SIZE><PRODUCTID>2000300408</PRODUCTID><PRODUCTIMAGE>http://www.forever21.com/images/intl_g/00300408-06.jpg</PRODUCTIMAGE></ITEM></ITEMS></BIS>"

            // MULTIPLE ITEMS
            "<BIS><ITEMS><ITEM><BRAND>F21</BRAND><PRODUCTNAME>Floral Lace Bralette</PRODUCTNAME><PRICE>10.9</PRICE><COLOR>BLACK</COLOR><SIZE>Small</SIZE><PRODUCTID>2000300408</PRODUCTID><PRODUCTIMAGE>http://www.forever21.com/images/intl_g/00300408-06.jpg</PRODUCTIMAGE></ITEM><ITEM><BRAND>F21</BRAND><PRODUCTNAME>Floral Lace Bralette</PRODUCTNAME><PRICE>10.9</PRICE><COLOR>BLACK</COLOR><SIZE>Small</SIZE><PRODUCTID>2000300408</PRODUCTID><PRODUCTIMAGE>http://www.forever21.com/images/intl_g/00300408-06.jpg</PRODUCTIMAGE></ITEM><ITEM><BRAND>F21</BRAND><PRODUCTNAME>Floral Lace Bralette</PRODUCTNAME><PRICE>10.9</PRICE><COLOR>BLACK</COLOR><SIZE>Small</SIZE><PRODUCTID>2000300408</PRODUCTID><PRODUCTIMAGE>http://www.forever21.com/images/intl_g/00300408-06.jpg</PRODUCTIMAGE></ITEM></ITEMS></BIS>"
        }
      }
    }
  };

  let token = $("#token").val();
  sendEmail(data, "BACK_IN_STOCK", token);
};

// SHIP TO STORE JOURNEY
const shipToStoreJourney = () => {
  let email = "michael.o@forever21.com";
  let data = {
    ContactKey: SEND_EMAIL,
    EventDefinitionKey: "APIEvent-80f293d9-8d07-e4dd-931d-910f0fd4a26e",
    Data: {
      FirstName: "Moneer",
      LastName: "A",
      email_address: "forevermoneer@gmail.com",
      order_group_id: 4,
      region: "US",
      source: "test",
      XML_DATA:
        "<ORDER><BILLINGADDRESS><CUSTOMERNAME>Gibong Ryu</CUSTOMERNAME><ADDRESS1>3880 N Mission Road</ADDRESS1><ADDRESS2>Room 2112</ADDRESS2><CITY>Los Angeles</CITY><STATE>CA</STATE><ZIPCODE>90031</ZIPCODE></BILLINGADDRESS><SHIPPINGINFORMATION><SHIPPINGMETHOD>Standard</SHIPPINGMETHOD><CUSTOMERNAME>Gibong Ryu</CUSTOMERNAME><ADDRESS1>3880 N Mission Road</ADDRESS1><ADDRESS2>Room 2112</ADDRESS2><CITY>Los Angeles</CITY><STATE>CA</STATE><ZIPCODE>90031</ZIPCODE></SHIPPINGINFORMATION><ORDERNUMBER>12345678</ORDERNUMBER><ORDERDATE>06/17/2016 15:23:11</ORDERDATE><SUBTOTAL>24.80</SUBTOTAL><SHIPPINGTOTAL>24.80</SHIPPINGTOTAL><TAX>24.80</TAX><TOTAL>24.80</TOTAL><EMAIL>gb.ryu@forever21.com</EMAIL><PAYMENT><GIFTCARDTOTALAMOUNT>0.00</GIFTCARDTOTALAMOUNT><CREDITCARDTOTALAMOUNT>30.00</CREDITCARDTOTALAMOUNT><PAYPALTOTALAMOUNT>0.00</PAYPALTOTALAMOUNT></PAYMENT><ITEMS><ITEM><NAME>SpongeBob x Mina Kwon Varsity Tee</NAME><QUANTITY>1</QUANTITY><PRODUCTID>2002246551</PRODUCTID><EXTENDEDPRICE>18.90</EXTENDEDPRICE><PRODIMAGE>https://www.forever21.com/images/f21/sbo/product/02246551-01.jpg</PRODIMAGE><SIZECOLOR>BLACK</SIZECOLOR></ITEM></ITEMS><FNAME>Gibong Ryu</FNAME><STORENAME>STORE001</STORENAME><STOREADDR1>3888 N Mission Road</STOREADDR1><STORECITY>Los Angeles</STORECITY><STOREZIPCODE>90031</STOREZIPCODE><BILLCUSTOMERNAME>Gibong Ryu</BILLCUSTOMERNAME><BILLADDR1>3888 N Mission Road</BILLADDR1><BILLADDR2>Room 7777</BILLADDR2><BILLCITY>Los Angeles</BILLCITY><BILLSTATE>CA</BILLSTATE><BILLZIPCODE>90031</BILLZIPCODE><STOREPHONE>1234567</STOREPHONE><LASTDATE>04/08/2019 16:56:19</LASTDATE></ORDER>"
    }
  };

  let token = $("#token").val();
  startJourney(data, token);
};

//init function wiring up buttons with jQuery
const init = () => {
  $("#getToken").on("click", getToken);
  $("#pwReset").on("click", sendPasswordReset);
  $("#shipping").on("click", sendShipping);
  $("#order").on("click", sendOrder);
  $("#general").on("click", sendGeneral);
  $("#csConfirmation").on("click", comingSoonConfirmation);
  $("#csNotification").on("click", comingSoonNotification);
  $("#giftSender").on("click", eGiftSender);
  $("#giftReceiver").on("click", eGiftReceiver);
  $("#oosFront").on("click", outOfStockFront);
  $("#oosBack").on("click", outOfStockBack);
  $("#backInStock").on("click", backInStock);
  $("#testJourney").on("click", shipToStoreJourney);
};

$(document).ready(() => {
  init();
});

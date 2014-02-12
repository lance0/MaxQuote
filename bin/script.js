var handle_change, maxprice, update;
var currentask, currentaskvolume, currentbid, currentbidvolume, highest24, lastbuy, lastsell, lasttrade, lowest24, volumebase24, avg;

maxprice = -1;

handle_change = function(orig, new_p, location) {
  if (new_p > orig && orig !== -1) {
    $(location).addClass("green");
  } else if (new_p < orig) {
    $(location).addClass("red");
  }
  window.setTimeout((function() {
    $(location).removeClass("green");
    return $(location).removeClass("red");
  }), 1500);
  return new_p;
};

update = function() {
  return $.ajax({
    url: "https://cryptorush.in/api.php?get=market&m=max&b=btc&json=true",
    dataType: "json",
    cache: false,
    success: function(data) {
      lasttrade = Number(data.last_trade);
      lastsell = Number(data.last_sell);
      lastbuy = Number(data.last_buy);
      currentask = Number(data.current_ask);
      currentaskvolume = Number(data.current_ask_volume);
      currentbid = Number(data.current_bid);
      currentbidvolume = Number(data.current_bid_volume);
      highest24 = Number(data.highest_24h);
      lowest24 = Number(data.lowest_24h);
	  // Hack a quick average...
	  avg = (lastbuy + lastsell) / 2;
	  
	maxprice = handle_change(maxprice, lasttrade, "#max-price");
	$("title").text(avg + " - Maxcoin"), $("#max-price").html(maxprice.toFixed(8)), $("#content").removeClass("hidden");
    }
  })
};

$(document).ready(function() {
  update();
  return setInterval(update, 60000);
});

$(document).click(update);
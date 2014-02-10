var handle_change, maxpriceoutput, update;

maxpriceoutput = -1;

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
  var maxprice;
  return $.ajax({
    url: "https://api.bitcoinaverage.com/exchanges/USD",
    dataType: "json",
    cache: false,
    success: function(data) {
      var currentask, currentaskvolume, currentbid, currentbidvolume, highest24, lastbuy, lastsell, lasttrade, lowest24, volumebase24;
      lasttrade = data.MAX / BTC.last_trade;
      lastsell = data.MAX / BTC.volume_btc;
      lastbuy = data.MAX / BTC.rates.last;
      currentask = data.MAX / BTC.current_ask;
      currentaskvolume = data.MAX / BTC.current_asl_volume;
      currentbid = data.MAX / BTC.current_bid;
      currentbidvolume = current_bid_volume;
      highest24 = highest_24h;
      lowest24 = lowest_24h;
      return volumebase24 = volume_base_24h;
    }
  }, maxprice = handle_change(maxpriceout, lasttrade, "#max-price"), $("title").text(avg + " - Maxcoin"), $("#max-price").html(maxprice.toFixed(2)), $("#content").removeClass("hidden"));
};

$(document).ready(function() {
  update();
  return setInterval(update, 60000);
});

$(document).click(update);
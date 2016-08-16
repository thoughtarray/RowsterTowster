var DAY_MS = 86400000
var HOUR_MS = DAY_MS / 24
var MIN_MS = HOUR_MS / 60
var SEC_MS = MIN_MS / 60

var PLAYTIME_MS = HOUR_MS * 3

var remaining = function(then) {
  ms = then - (new Date()).getTime()

  return {
    'hours': ms / HOUR_MS % 24,
    'mins':  ms / MIN_MS % 60,
    'secs':  ms / SEC_MS % 60,
  }
}

var tick = function() {
  var now = new Date()

  var _todayOnlineTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 18)
  var _todayOfflineTime = new Date(_todayOnlineTime.getTime() + PLAYTIME_MS)
  var _tomorrowOnlineTime = new Date(_todayOnlineTime.getTime() + DAY_MS)
  var _tomorrowOfflineTime = new Date(_tomorrowOnlineTime.getTime() + PLAYTIME_MS)

  var isOnline =  _todayOnlineTime < now && now < _todayOfflineTime
  var isOffline = !isOnline

  var onlineTime = (now < _todayOnlineTime) ? _todayOnlineTime : _tomorrowOnlineTime
  var offlineTime = (now < _todayOfflineTime) ? _todayOfflineTime : _tomorrowOfflineTime

  world = {
    rem: {},
    status: '',
    statusIcon: '',
    msg: '',
  }

  if (isOffline) {
    world.rem = remaining(onlineTime.getTime())
    world.status = 'Offline'
    world.statusIcon = '&#9729;'
    world.msg = "RowsterTowster's world is offline at the moment.  See you soon! :D"
  } else {
    world.rem = remaining(offlineTime.getTime())
    world.status = 'Online'
    world.statusIcon = '&#9728;'
    world.msg = "RowsterTowster's world should be online now.  If it is not, e-mail [e-mail address]"
  }

  display_hour = (world.rem.hours < 10) ? '0' + Math.floor(world.rem.hours) :
    Math.floor(world.rem.hours)
  display_mins = (world.rem.mins < 10) ? '0' + Math.floor(world.rem.mins) :
    Math.floor(world.rem.mins)
  display_secs = (world.rem.secs < 10) ? '0' + Math.floor(world.rem.secs) :
    Math.floor(world.rem.secs)

  var htmlWorldCountdown = $('#world_countdown')

  htmlWorldCountdown.find('.status_icon').html(world.statusIcon)
  htmlWorldCountdown.find('.status').html(world.status)
  $('#world_msg').html(world.msg)


  htmlWorldCountdown.find('.hours').html(display_hour)
  htmlWorldCountdown.find('.mins').html(display_mins)
  htmlWorldCountdown.find('.secs').html(display_secs)
}

tick()
var intervalID = setInterval(tick, 1000)

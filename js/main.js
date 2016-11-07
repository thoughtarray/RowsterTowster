(function(){

let UTC_ONLINE_HOUR = 3
let UTC_OFFLINE_HOUR = 6

let tick = function()
{
  let now = moment.utc()
  let isOnline = UTC_ONLINE_HOUR <= now.hour() && now.hour() < UTC_OFFLINE_HOUR

  let world = {
    rem: null,
    status: '',
    statusIcon: '',
    msg: '',
  }

  // Set display data
  if (isOnline)
  {
    offlineTime = now.clone().set({
      'hour': UTC_OFFLINE_HOUR,
      'minute': 0,
      'second': 0,
      'millisecond': 0
    })

    world.rem = moment.duration(offlineTime.diff(now))
    world.status = 'Online'
    world.statusIcon = '&#9728;'
    world.msg = "RowsterTowster's world should be online now."
  }
  else
  {
    onlineTime = now.clone().set({
      'hour': UTC_ONLINE_HOUR,
      'minute': 0,
      'second': 0,
      'millisecond': 0
    }).add(1, 'day')

    world.rem = moment.duration(onlineTime.diff(now))
    world.status = 'Offline'
    world.statusIcon = '&#9729;'
    world.msg = "RowsterTowster's world is offline at the moment.  See you soon! :D"
  }

  // Display data
  let htmlWorldCountdown = $('#world_countdown')

  htmlWorldCountdown.find('.status_icon').html(world.statusIcon)
  htmlWorldCountdown.find('.status').html(world.status)
  $('#world_msg').html(world.msg)

  zeroPad = function(timeUnit)
  {
    if (timeUnit < 10) return '0' + timeUnit

    return timeUnit
  }

  htmlWorldCountdown.find('.hours').html(zeroPad(world.rem.get('hours')))
  htmlWorldCountdown.find('.mins').html(zeroPad(world.rem.get('minutes')))
  htmlWorldCountdown.find('.secs').html(zeroPad(world.rem.get('seconds')))
}

tick()
var intervalID = setInterval(tick, 1000)

})()

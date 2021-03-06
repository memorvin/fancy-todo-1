'use strict'

const router = require('express').Router()
const calendarAxios = require('../config/calendarAPI');

router.post('/', function(req, res, next) {
  console.log(req.body)  
  let calendarId;
      const { token, title, dueDate } = req.body;

      calendarAxios({
        method: 'get',
        url: '/accounts/me/cal/calendars',
        headers: {
            Authorization: `Bearer ${token}`
        }
      })
      .then(({data}) => {
        console.log(data)
        calendarId = data.objects[0].id
        return calendarAxios({
          method: 'post',
          url: `/accounts/me/cal/calendars/${calendarId}/events`,
          headers: {
            Authorization: `Bearer ${token}`
          },
          data: {
            name: title,
            start: new Date(),
            end: dueDate
          }
        })
      })
      .then(({data}) => {
        res.status(200).json({
          todoId: data.id,
          calendarId: data.calendar_id
        })
      })
      .catch(next)
})

module.exports = router
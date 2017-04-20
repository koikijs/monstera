import ApiClient from '../helpers/ApiClient';
import moment from 'moment';
import __ from 'lodash';
import uris from '../uris';

export default app => {

  app.get('/api/:event/next', (req, res) => {
    const client = new ApiClient(req);

    client
      .fetchJSON('https://chaus.herokuapp.com' + uris.apis.attendees, 'GET', {
        event: req.params.event,
        limit: 10000
      })
      .then(
        attendees => {
          client
            .fetchJSON('https://chaus.herokuapp.com' + uris.normalize(uris.apis.event, { id: req.params.event}))
            .then(
              event => {
                client
                  .fetchJSON('https://chaus.herokuapp.com' + uris.apis.candidates, 'GET', {
                    event: req.params.event,
                    date: '[' + moment().format() + ',' + moment('2999-12-31').format() + ']',
                    limit: 10000
                  })
                  .then(json => {
                    const calc = [];
                    json.items.map(item => {
                      const target = __.find(calc, {date: item.date});
                      if ( target ) {
                        target.count++;
                        target.users.push( item.user.id );
                      } else {
                        calc.push({
                          date: item.date,
                          count: 1,
                          users: [ item.user.id ]
                        });
                      }
                    });

                    const noplans = __.reduce(json.items, (targets, candidate) => {
                      return __.reject(targets, target => target.user.id === candidate.user.id);
                    }, attendees.items);
                    console.log(noplans);

                    res.json({
                      candidates:
                        __(calc)
                          .chain()
                          .filter(item => item.count >= event.min)
                          .orderBy(['date'], ['asc'])
                          .value() || [],
                      noplans: noplans.map( noplan => noplan.user.id )
                    });

                  });
              },
              err => console.log(err)
            );
        }
      );
  });
};

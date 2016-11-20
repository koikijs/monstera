import ApiClient from '../helpers/ApiClient';
import moment from 'moment';
import __ from 'lodash';
import uris from '../uris';

export default app => {

  app.get('/api/:event/next', (req, res) => {
    const client = new ApiClient(req);

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
                } else {
                  calc.push({
                    date: item.date,
                    count: 1
                  });
                }
              });

              res.json(
                __(calc)
                  .chain()
                  .filter(item => item.count >= event.min)
                  .orderBy(['date'], ['asc'])
                  .value() || []);
            });
        },
        err => console.log(err)
      );
  });
};

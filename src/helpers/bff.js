import ApiClient from '../helpers/ApiClient';
import moment from 'moment';
import __ from 'lodash';

export default app => {

  app.get('/api/:event/next', (req, res) => {
    const client = new ApiClient(req);

    client
      .fetchJSON('https://chaus.herokuapp.com/apis/monstera/participants')
      .then(
        participants => {
          client
            .fetchJSON('https://chaus.herokuapp.com/apis/monstera/candidates', 'GET', {
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
                  .filter(item => item.count === participants.items.length)
                  .orderBy(['date'], ['asc'])
                  .value()[0] || {});
            });
        }
      );
  });
};

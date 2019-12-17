const Koa = require('koa');
const route = require('koa-route');
const bodyParser = require('koa-bodyparser');

const app = new Koa();

app.use(bodyParser());

// DB biometrcis PUSH
const pushBiometrics = biometricObj => {

    console.log('pushing biometrics to DB:');
    console.log(JSON.stringify(biometricObj));

}

// DB most recent timeStamp PULL
const pullMostRecentTimeStamp = (mockErr = false) => {

    if (mockErr) throw new Error('Fake error for tests!!!')

    const lastTimeStampDummy = {

        Timestamp: 1576490100,
        DeviceId: 1,
        UserId: 1,
        Intensity: 0.011111111380159855,
        Steps: 0,
        Kind: 0,
        HeartRate: 0

    }
    
    return lastTimeStampDummy.Timestamp;

};

// post recieved biometrics
const postBiometrics = ctx => {

    const recieved = ctx.request.body;

    try {

        pushBiometrics(recieved);

    } catch(err) {
        
        ctx.response.body = { code: 500, recieved };

    }
    
    ctx.response.body = { code: 200, recieved };

};

// get most recent timeStamp
const getMostRecentTimeStamp = ctx => {

    const mostRecentTimeStamp = pullMostRecentTimeStamp();

    ctx.response.type = 'json';
    ctx.response.body = { mostRecentTimeStamp };

}


// routes
app.use(route.post('/biometrics', postBiometrics));
app.use(route.get('/biometrics/mostrecent', getMostRecentTimeStamp));

app.listen(3000);


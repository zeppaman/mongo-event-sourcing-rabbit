

var amqp = require('amqplib/callback_api');

const plugin = async function (input,config,context)
{
    let prefix=config.prefix || 'q';
    let queue=`${prefix}${input.ns.db}-${input.ns.coll}`
    console.log(queue);
    
  
        amqp.connect(config.settings.connection, function(error0, connection) {
            if (error0) {
                console.error(error0);
                return;
              }
              connection.createChannel(function(error1, channel) {
                if (error1) {
                    console.error(error1);
                    return;
                  }
                
                  channel.assertQueue(queue, {
                    durable: true
                  });
                  console.log(queue);
                  channel.sendToQueue(queue, Buffer.from(JSON.stringify(input)));
              });
        });
    
    
};

module.exports=plugin;
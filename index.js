
const Broker = require('rascal').BrokerAsPromised;

const broker = null;

broker.on('error', console.error);
const plugin = async function (input,config,context)
{
    if(broker==null)
    {
        let config=config.settings;
        broker=await Broker.create(config);
    }
    
    let prefix=config.prefix || '';
    let key=+`${prefix}${item.ns.db}-${item.ns.col}`

    // Publish a message
    const publication = await broker.publish(key, input);
    publication.on('error', console.error);
    
};
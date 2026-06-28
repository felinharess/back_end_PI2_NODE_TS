import createApp from './app';

async function start() {
    const app =  await createApp();
    const port = process.env.PORT || 10000; 
    app.listen(port, ()=>{
        console.log(`Server running on port ${port}`);
    })
}

start();
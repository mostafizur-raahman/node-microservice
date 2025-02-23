import expressApp from "./expressApp";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    expressApp.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

    process.on("uncaughtException", async (err) => {
        console.log(err);
        process.exit(1);
    });
};

startServer().then(() => {
    console.log("Server started successfully");
});

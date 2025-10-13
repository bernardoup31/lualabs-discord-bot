## Running the bot

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set up environment variables:

    Create a `.env` file in the root directory of your project and add the following lines, replacing the placeholders with your actual bot token, public key, and server ID:
    
    ```env
    DISCORD_TOKEN=your-bot-token
    PUBLIC_KEY=your-public-key
    SERVER_ID=your-server-id
    APP_ID=your-application-id
    ```

3. Deploy commands to your server:

    On WSL terminal, run:
    
    ```bash
    node index.js
    ```

    This will start your bot.

4. Register new commands:

    Whenever you add a new command or modify an existing one, run the following command to update the commands on your server:
    
    ```bash
    node deploy-command.js
    ``` 

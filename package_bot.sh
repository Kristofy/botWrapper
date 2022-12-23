cp ./ai-arena.bot.config.json ./ai-arena.config.json
zip -j planet-war-bot bots/win_bot.cpp bots/utility.hpp bots/data.hpp ai-arena.config.json
rm ai-arena.config.json

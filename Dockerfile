FROM quay.io/hermit/hermit-ser:latest

RUN git clone https://github.com/A-d-i-t-h-y-a-n/hermit-bot /root/tom-official-bot
WORKDIR /root/tom-official-bot/
RUN npm install
CMD ["pm2-runtime", "ecosystem.config.js"]

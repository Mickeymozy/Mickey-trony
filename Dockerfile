FROM quay.io/gurusensei/gurubhay:latest

RUN git clone https://github.com/Mickeymozy/Mickey-trony /root/mickey

WORKDIR /root/mickey/

RUN npm install --platform=linuxmusl

EXPOSE 5000

CMD ["npm", "start"]

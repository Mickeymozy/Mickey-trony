FROM quay.io/gurusensei/gurubhay:latest

RUN git clone https://github.com/Mickeymozy/Mickey-trony /root/lazack

WORKDIR /root/lazack/

RUN npm install --platform=linuxmusl

EXPOSE 5000

CMD ["npm", "start"]

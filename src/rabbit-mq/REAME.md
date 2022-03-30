# RabbitMQ

## channel.assertQueue設定durable:true表示queue要永久保留, 若RabbitMQ Server掛了, 則queue仍然存在, 下次重啟時, 就不用重新新增這條queue

## channel.consume時若noAck:false, 沒有回傳channel.ack(msg)的話, 則queue不會再給這個consumer message

## channel.sendToQueue設定persistent: true表示message要永久保留, 若RabbitMQ Server掛了, 則message仍然存在, 下次重啟時, 就不用重新新增這則message

## channel.prefetch設定數字表示一次可領幾則message(記得不要自動回覆Ack, 即將noAck設定為false)

## producer和queue中間還多一個exchange, producer其實是傳給exchange, exchange才傳到queue裡面

## 要使多個consumer接收到訊息, producer必須使用assertExchange, publish

## 要使多個consumer接收到訊息, consumer必須使用bindQueue綁定某exchange

## 一個exchange只會有一種exchangeType, 若consumer想同時收到fanout/direct兩種exchange, 則就必須assertExchange兩個exchange
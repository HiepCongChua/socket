# socket
- Internet đơn giản chỉ là một mạng lưới giúp các máy tính có khả năng giao tiếp với nhau
và các máy tính giao tiếp với nhau bằng các packet
VD: Browser giao tiếp vs Server, Browser gửi và nhận dữ liệu đến server, dữ liệu ở dạng các packet, mỗi packet được chia ra làm 5 lớp theo thứ tự sau từ trên xuống dưới
+ Application
+ Transport => UDP/TCP: 
+ Network => IP
+ Link => wifi
+ Physical => cables
Đây là các lớp tạo nên một gói tin (Packet) được gửi và nhận giữa client và server, 3 lớp transport,network, link kết hợp với nhau tạo thành bộ giao thức TCP/IP giúp cho 2 hay nhiều máy tính giao tiếp với nhau
- Với tư cách là một developer thì chúng ta thường làm việc với lớp Application (HTTP,FTP,SSH,SMTP)
- Giả sử chúng ta có một máy tính kết nối internet => như vậy lớp transport sẽ tạo ra 2^16 cổng trên máy tính của bạn, bất cứ khi nào bạn khởi động một ứng dụng (node chẳng hạn) bạn có thể chạy nó trên port 3000 tức là nó đã chạy trên tập các cổng này.
Giả sử có một mô hình Client và Server, đứng ở Client sẽ ra sao nếu chúng ta muốn giao tiếp với một máy tính khác (server) qua cổng 80.
Khi chúng ta ở Client (browser) browser cũng là một chương trình nó cũng sẽ mở một loạt các cổng trên máy tính để gửi và nhận dữ liệu, giả sử browser ở port 3000 trên máy tính, nó sẽ chuyển request đến lớp transport và request sẽ được gói gọn trong cái được gọi là segment, bên trong segement sẽ có thứ gọi là 
+ meta data
+ destination port
+ Source port

* Ở lớp transport sẽ có 2 giao thức khác nhau là UDP và TCP

+ UDP rất nhẹ, khoảng 8 byte cho tiêu đề
   + Nếu bạn sử dụng UDP bạn không cần phải kết nối confirm trước (xác nhận xem máy tính kia có muốn kết nối hay không) mà chúng ta có thể thực hiện kết nối với một máy tính khác ngay lập tức, có thể máy tính kia không cho phép kết nối cũng ko sao, đây thực sự là một lợi thế rất lớn
   + Nhưng UDP có nhược điểm, UDP dew care nếu packet bị thất lạc, nó sẽ tiếp tục gửi các packet, nếu như mạng bị tắc nghẽn ?? UDP đéo care nó vẫn cứ tiếp tục gửi các package 
   => UDP  nhanh (vì nó nhẹ và nó không cần thiết lập kết nối ban đầu rồi mới gửi request) nhưng nó có một vài nhược điểm
   => UDP thường được sử dụng trong video game, trò chơi real time

+ TCP không giống UDP, nó cần máy đích xác nhận xem có muốn kết nối hay không dựa trên 3 bước.
   + Client gửi request yêu cầu kết nối đến server
   + Server tiếp nhận gửi trả yêu cầu (đồng ý kết nối hoặc không)
   + Client nhận được kết quả từ server từ đó mới tiếp tục gửi request
=> TCP cũng có deliverry check tức là kiểm tra xem máy đích đã nhận được package hay chưa, nếu bên máy đích báo chưa nhận được thì máy gửi sẽ gửi lại
=> Với TCP Bạn cũng thể đảm bảo các package được gửi đúng thứ tự bất kể điều gì xảy ra vs mạng
=> Nếu việc nghẽn mạng xảy ra TCP có thể giữ cho việc thất lạc pakage giảm thiểu tối đa

Kết luận 
=> TCP : tin cập nhưng chậm (HTTP và SocketIO sử dụng giao thức TCP)
=> UDP : nhanh nhưng thiếu sự tin cậy
* Phân biệt TCP và HTTP : 
+ TCP hoạt động ở tầng transport trong khi HTTP hoạt động ở tầng Application
+ Điều này có nghĩa chúng là 2 khái niệm hoàn toàn độc lập với nhau nhưng HTTP sẽ hoạt động dựa trên TCP , 
+ TCP chịu trách nhiệm thiết lập kết nối giữa 2 máy tính.
+ HTTP chịu trách nhiệm giúp 2 máy tính giao tiếp với nhau dựa trên kết nối đó
+ Hệ thống phân giải tên miền DNS => TCP handshake => HTTP connecting.  

 Websocket sử dụng TCP nó là web native technologhy dựa trên javascript, nó cho phép kết nối tới server thông qua TCP , HTTP nữa có thể hiểu đơn giản HTTP và WebSocket là những giao thức giúp 2 máy tính giao tiếp với nhau dựa trên TCP.

 + SocketIO giúp chúng ta làm việc với Websocket dễ dàng hơn, có thể hiểu đơn giản Websocket như javascript và SocketIO như Jquery


* Socket là gì ?
=> Cần phân biệt socket với websocket?
+ Socket đơn giản chỉ là một đường ống giúp dữ liệu đi qua giữa 2 máy tính, nó chạy trên TCP

+ Chúng ta có HTTP message bao gồm : Header và Body, Header sẽ cung cấp thông tin về Body thông qua meta-data, máy nhận sẽ xử lý data nằm trong body như thế nào dựa vào Content-Type trong meta-data.

+ Chú ý rằng triển khai Websocket trên Client hoàn toàn khác với việc trển khai trên Server.
khi chúng ta sử dụng WebsocketAPI trên client và Websocket/SocketIO ở giữa chúng 
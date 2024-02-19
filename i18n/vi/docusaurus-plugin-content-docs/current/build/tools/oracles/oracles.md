# Oracle

Các chuỗi khối oracle đóng vai trò là một cầu nối giữa chuỗi khối và các nguồn dữ liệu bên ngoài khác. Trong thực tế, chuỗi khối là một hệ thống đóng; do đó, không thể kéo dữ liệu vào hoặc ra khỏi bất kỳ hệ thống bên ngoài (dữ liệu ngoài chuỗi) và chỉ có quyền truy cập vào dữ liệu đã có trong bối cảnh chuỗi khối ban đầu. Điều này tạo ra một vấn đề về nguồn gốc chuỗi khối, trong đó chuỗi khối không thể có được dữ liệu từ các lần xuất hiện thực tế. Tuy nhiên, các hợp đồng thông minh phải kết nối với một loạt các nguồn dữ liệu bên ngoài để thực hiện một số chức năng hữu ích. Ví dụ, [hợp đồng thông minh kết hợp](https://chain.link/education-hub/hybrid-smart-contracts) sử dụng oracle để đưa ra giá trị tài sản cho tài chính, dữ liệu thời tiết cho bảo hiểm, tính ngẫu nhiên để chơi game, cảm biến IoT để quản lý chuỗi cung ứng, v.v.

Như cầu về chuỗi khối để truy cập và kết nối với các nguồn dữ liệu bên ngoài, các hệ thống kế thừa và tính toán nâng cao mang lại các nguồn cấp dữ liệu oracle. Không thể đánh giá thấp lợi ích của các oracle trong ngành công nghiệp chuỗi khối, do đó, điều quan trọng là bạn phải thực hiện nghiên cứu trước khi chọn các oracle cho mình khi tạo ra các hợp đồng thông minh kết hợp. Do đó, việc tránh các oracle tập trung được khuyến khích vì tận dụng các oracle phi tập trung là rất quan trọng để phát triển các ứng dụng phi tập trung của bạn. Một mặt, các oracle tập trung được kiểm soát bởi một thực thể duy nhất và, như vậy, có một điểm lỗi duy nhất, khiến các hợp đồng thông minh dễ bị tấn công. Mặt khác, các oracle phi tập trung được thiết kế để vượt qua các giới hạn của các oracle tập trung bằng cách loại bỏ điểm lỗi duy nhất. Một oracle phi tập trung bao gồm nhiều người tham gia trong mạng ngang hàng hình thành sự đồng thuận trên dữ liệu ngoài chuỗi trước khi gửi nó đến một hợp đồng thông minh.

Các nhà cung cấp sau đây đã tích hợp với Klaytn để cung cấp dịch vụ oracle phi tập trung:

- [Orakl Network](https://docs.orakl.network/docs/developers-guide/readme)
- [Witnet](https://docs.witnet.io/)
- [SupraOracles](https://supraoracles.com/docs/overview)
- [KlayOracle](https://klayoracle.gitbook.io/v1.0.0/)

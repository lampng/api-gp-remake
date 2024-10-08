# API GP REMAKE

-   API LINK: https://api-gp-remake.onrender.com/

## Overview

API này đóng vai trò là phần phụ trợ cho dự án tốt nghiệp đợt 2

### USER - Người dùng

-   Đăng ký - chỉ dành cho Quarn lys

```http
  POST /user/register
```

| Body                                                 | Type      | Description   |
| :--------------------------------------------------- | :-------- | :------------ |
| `name`                                               | `TEXT`    | Tên nhân viên |
| `email`                                              | `TEXT`    | Email đăng ký |
| `role_ID`                                            | `VARCHAR` | Vai trò       |
| Nếu `role` có giá trị là là `Nhân viên` thì có thêm: |
| `job`                                                | `VARCHAR`  | Chức vụ       |

-   Đăng nhập

```http
  POST /user/login
```

| Body       | Type     | Description |
| :--------- | :------- | :---------- |
| `email`    | `TEXT` | Email       |
| `password` | `TEXT` | Mật khẩu    |

-   Đăng xuất

```http
  GET /user/logout/${id} = session id login
```

| Parameter | Type     | Description                     |
| :-------- | :------- | :------------------------------ |
| `id`      | `VARCHAR` | Id session người dùng đăng nhập |

-   Cập nhập người dùng

```http
  PUT /user/update/${id} = id của người dùng
```

| Parameter | Type     | Description   |
| :-------- | :------- | :------------ |
| `id`      | `string` | Id người dùng |

| Body                  | Type      | Description       |
| :-------------------- | :-------- | :---------------- |
| `name`                | `string`  | Tên               |
| `email`               | `string`  | Email             |
| `address`             | `string`  | Địa chỉ           |
| `phone`               | `string`  | Số điện thoại     |
| `birthday`            | `string`  | Ngày sinh         |
| `citizenIdentityCard` | `string`  | Căn cước công dân |
| `gender`              | `string`  | Giới tính         |
| `role`                | `string`  | Vai trò           |
| `job`                 | `string`  | Chức vụ           |
| `avatar`              | `Blob`    | Ảnh đại diện      |
| `status`              | `Boolean` | Trạng thái        |

-   Đổi mật khẩu

```http
  PUT /user/change-password/${id} = id của người dùng
```

| Body          | Type     | Description  |
| :------------ | :------- | :----------- |
| `oldpassword` | `string` | Mật khẩu cũ  |
| `password`    | `string` | Mật khẩu mới |

-   Quên mật khẩu

```http
  GET /user/forgot-password
```

| QUERY   | Type     | Description |
| :------ | :------- | :---------- |
| `email` | `string` | Email       |

-   Verify Email

```http
  POST /user/verify-confirmation-code
```

| Body               | Type     | Description                |
| :----------------- | :------- | :------------------------- |
| `email`            | `string` | email ở phần quên mật khẩu |
| `confirmationCode` | `string` | mã xác thực ở trong mail   |

-   Verify Email

```http
  PUT /user/reset-password
```

| Body          | Type     | Description                |
| :------------ | :------- | :------------------------- |
| `email`       | `string` | email ở phần quên mật khẩu |
| `newPassword` | `string` | Mật khẩu mới               |

-   Xoá người dùng

```http
  DELETE /user/delete/:id
```

| Body | Type     | Description   |
| :--- | :------- | :------------ |
| `id` | `string` | Id người dùng |

-   Gọi danh sách người dùng

```http
  GET /user/list
```

-   Thêm lương cho người dùng

```http
  POST /user/salary/:id
```

| Body     | Type     | Description      |
| :------- | :------- | :--------------- |
| `year`   | `string` | Năm lương        |
| `month`  | `string` | Tháng lương      |
| `salary` | `number` | Lương của tháng  |
| `bonus`  | `number` | Thưởng của tháng |

-   Gọi danh sách lương người dùng

```http
  GET /user/salary/:id
```

| Parameter | Type     | Description   |
| :-------- | :------- | :------------ |
| `id`      | `string` | Id người dùng |

| QUERY   | Type     | Description                    |
| :------ | :------- | :----------------------------- |
| `year`  | `string` | Năm lương                      |
| `month` | `string` | Tháng lương, có thể không thêm |

-   Cập nhập lương người dùng

```http
  PUT /user/salary/:id
```

| Parameter | Type     | Description   |
| :-------- | :------- | :------------ |
| `id`      | `string` | Id người dùng |

| QUERY   | Type     | Description |
| :------ | :------- | :---------- |
| `year`  | `string` | Năm lương   |
| `month` | `string` | Tháng lương |

| Body     | Type     | Description |
| :------- | :------- | :---------- |
| `salary` | `number` | Lương       |
| `bonus`  | `number` | Thưởng      |

-   Xoá lương người dùng

```http
  DELETE /user/salary/:id
```

| Parameter | Type     | Description   |
| :-------- | :------- | :------------ |
| `id`      | `string` | Id người dùng |

| QUERY   | Type     | Description |
| :------ | :------- | :---------- |
| `year`  | `string` | Năm lương   |
| `month` | `string` | Tháng lương |

### CLIENT - Khách hàng

-   Thêm khách hàng mới

```http
  POST /client/create
```

| Body        | Type     | Description       |
| :---------- | :------- | :---------------- |
| `name`      | `string` | Tên khách hàng    |
| `address`   | `string` | Địa chỉ           |
| `phone`     | `string` | Số điện thoại     |
| `phone2`    | `string` | Số điện thoại phụ |
| `gender`    | `string` | Giới tính         |
| `creatorID` | `number` | Id người tạo      |

-   Gọi danh sách khách hàng

```http
  GET /client/list
```

-   Gọi chi tiết khách hàng

```http
  GET /client/detail/:id
```

| Parameter | Type     | Description       |
| :-------- | :------- | :---------------- |
| `id`      | `string` | Id của khách hàng |

-   Cập nhập khách hàng

```http
  PUT /client/update/${id} = id của khách hàng
```

| Parameter | Type     | Description       |
| :-------- | :------- | :---------------- |
| `id`      | `string` | Id của khách hàng |

| Body      | Type     | Description       |
| :-------- | :------- | :---------------- |
| `name`    | `string` | Tên khách hàng    |
| `address` | `string` | Địa chỉ           |
| `phone`   | `string` | Số điện thoại     |
| `phone2`  | `string` | Số điện thoại phụ |
| `gender`  | `string` | Giới tính         |

-   Xoá khách hàng

```http
  DELETE /client/delete/:id
```

| Parameter | Type     | Description       |
| :-------- | :------- | :---------------- |
| `id`      | `string` | id của khách hàng |

### SERVICE - Dịch vụ

-   Tạo dịch vụ

```http
  POST /service/create
```

| Body          | Type     | Description |
| :------------ | :------- | :---------- |
| `name`        | `string` | Tên dịch vụ |
| `description` | `string` | Mô tả       |
| `price`       | `string` | Giá         |
| `image`       | `Blob`   | Ảnh dịch vụ |

-   Cập nhập dịch vụ

```http
  PUT /service/update/:id
```

| Parameter | Type     | Description |
| :-------- | :------- | :---------- |
| `id`      | `string` | Id dịch vụ  |

| Body          | Type     | Description |
| :------------ | :------- | :---------- |
| `name`        | `string` | Tên dịch vụ |
| `description` | `string` | Mô tả       |
| `price`       | `string` | Giá         |
| `image`       | `Blob`   | Ảnh dịch vụ |

-   Xoá dịch vụ

```http
  DELETE /service/delete/:id
```

| Parameter | Type     | Description |
| :-------- | :------- | :---------- |
| `id`      | `string` | Id dịch vụ  |

-   Danh sách dịch vụ

```http
  GET /service/list/:id
```

| Parameter | Type     | Description |
| :-------- | :------- | :---------- |
| `id`      | `string` | Id dịch vụ  |

-   Chi tiết dịch vụ

```http
  GET /service/detail/:id
```

| Parameter | Type     | Description |
| :-------- | :------- | :---------- |
| `id`      | `string` | Id dịch vụ  |

### Wedding Outfit - Áo cưới

-   Thêm áo cưới

```http
  POST /WeddingOutfit/create
```

| Body          | Type     | Description |
| :------------ | :------- | :---------- |
| `name`        | `string` | Tên áo cưới |
| `description` | `string` | Mô tả       |
| `size`        | `string` | Size        |
| `price`       | `string` | Giá         |
| `color`       | `string` | Màu sắc     |
| `image`       | `Blob`   | Hình ảnh    |

-   Cập nhập Áo cưới

```http
  PUT /WeddingOutfit/update/:id
```

| Parameter | Type     | Description |
| :-------- | :------- | :---------- |
| `id`      | `string` | Id áo cưới  |

| Body          | Type     | Description |
| :------------ | :------- | :---------- |
| `name`        | `string` | Tên áo cưới |
| `description` | `string` | Mô tả       |
| `size`        | `string` | Size        |
| `price`       | `string` | Giá         |
| `color`       | `string` | Màu sắc     |
| `image`       | `Blob`   | Hình ảnh    |
| `status`      | `Blob`   | Trạng thái  |

-   Xoá Áo cưới

```http
  DELETE /WeddingOutfit/delete/:id
```

| Parameter | Type     | Description |
| :-------- | :------- | :---------- |
| `id`      | `string` | Id áo cưới  |

-   Danh sách Áo cưới

```http
  GET /WeddingOutfit/list/
```

-   Chi tiết Áo cưới

```http
  GET /WeddingOutfit/detail/:id
```

| Parameter | Type     | Description |
| :-------- | :------- | :---------- |
| `id`      | `string` | Id áo cưới  |

### Contract - Hợp đồng

-   Tạo hợp đồng

```http
  POST /contract/create
```

| Body              | Type     | Description           |
| :---------------- | :------- | :-------------------- |
| `userId`          | `string` | Id người tạo hợp đồng |
| `clientId`        | `string` | Id khách hàng         |
| `services`        | `string` | Danh sách dịch vụ     |
| `weddingOutfit`   | `string` | Danh sách áo cưới     |
| `note`            | `string` | Ghi chú               |
| `deliveryDate`    | `string` | Ngày trả ảnh          |
| `location`        | `string` | Địa chỉ               |
| `prepayment`      | `string` | Tiền đặt cọc          |
| `additionalCosts` | `string` | Chi phi phát sinh     |
| `priceTotal`      | `string` | Tổng tiền             |

| services    | Type     | Description           |
| :---------- | :------- | :-------------------- |
| `userId`    | `string` | Id người tạo hợp đồng |
| `serviceId` | `string` | Id dịch vụ            |

| weddingOutfit     | Type     | Description           |
| :---------------- | :------- | :-------------------- |
| `userId`          | `string` | Id người tạo hợp đồng |
| `weddingOutfitId` | `string` | Id áo cưới            |
| `rentalDate`      | `DATE`   | Ngày thuê             |
| `returnDate`      | `DATE`   | Ngày trả              |
| `description`     | `string` | Mô tả                 |

| additionalCosts | Type     | Description    |
| :-------------- | :------- | :------------- |
| `description`   | `string` | Mô tả          |
| `price`         | `string` | Tiền phát sinh |

-   Danh sách hợp đồng

```http
  GET /contract/list/
```

-   Danh sách hợp đồng theo người dùng

```http
  GET /contract/list/:id
```

| Params   | Type     | Description   |
| :------- | :------- | :------------ |
| `userId` | `string` | Id người dùng |

-   Chi tiết hợp đồng

```http
  GET /contract/detail/:id
```

| Params        | Type     | Description |
| :------------ | :------- | :---------- |
| `contract ID` | `string` | Id hợp đồng |

-   Xoá hợp đồng

```http
  GET /contract/delete/:id
```

| Params        | Type     | Description |
| :------------ | :------- | :---------- |
| `contract ID` | `string` | Id hợp đồng |

### Work - Công việc

-   Thêm loại công việc

```http
  POST /work/create
```

| BODY   | Type     | Description        |
| :----- | :------- | :----------------- |
| `name` | `string` | Tên loại công việc |

-   Danh sách loại công việc

```http
  GET /work/list
```

-   Sửa loại công việc

```http
  PUT /work/update/:id
```

| PARAMS | Type     | Description                |
| :----- | :------- | :------------------------- |
| `id`   | `string` | Id loại công việc muốn sửa |

| BODY   | Type     | Description        |
| :----- | :------- | :----------------- |
| `name` | `string` | Tên loại công việc |

-   Xoá loại công việc

```http
  DELETE /work/delete/:id
```

| PARAMS | Type     | Description                |
| :----- | :------- | :------------------------- |
| `id`   | `string` | Id loại công việc muốn xoá |

-   Thêm công việc cho nhân viên

```http
  POST /work/add-work
```

| BODY          | Type     | Description       |
| :------------ | :------- | :---------------- |
| `workType_ID` | `string` | Id loại công việc |
| `user_ID`     | `string` | Id nhân viên      |
| `workDate`    | `string` | Ngày làm việc     |
| `address`     | `string` | Địa chỉ           |
| `note`        | `string` | Ghi chú           |

-   Danh sách công việc của tất cả nhân viên

```http
  GET /work/list-work
```

-   Danh sách công việc của nhân viên

```http
  GET /work/user-work/:id?date=DD/MM/YYYY
```

| PARAMS | Type     | Description  |
| :----- | :------- | :----------- |
| `id`   | `string` | Id nhân viên |

| QUERY  | Type   | Description                          |
| :----- | :----- | :----------------------------------- |
| `date` | `DATE` | Ẩn nêu muốn hiển thị tất cả ngày làm |

-   Danh sách nhân viên có thể thêm công việc trong này

```http
  GET /work/list-user-add-work?date=DD/MM/YYYY
```

| QUERY  | Type   | Description                 |
| :----- | :----- | :-------------------------- |
| `date` | `DATE` | Ẩn nêu muốn hiển thị tất cả |

-   Chi tiết công việc

```http
  GET /work/detail-work/:id
```

| PARAMS | Type     | Description  |
| :----- | :------- | :----------- |
| `id`   | `string` | Id công việc |

-   Sửa công việc

```http
  PUT /work/update-work/:id
```

| PARAMS | Type     | Description  |
| :----- | :------- | :----------- |
| `id`   | `string` | Id công việc |

| BODY          | Type     | Description       |
| :------------ | :------- | :---------------- |
| `workType_ID` | `string` | Id loại công việc |
| `user_ID`     | `string` | Id nhân viên      |
| `workDate`    | `string` | Ngày làm          |
| `address`     | `string` | Địa chỉ           |
| `note`        | `string` | Ghi chú           |
| `status`      | `string` | Trạng thái        |

-   Xoá công việc

```http
  DELETE /work/delete-work/:id
```

| PARAMS | Type     | Description  |
| :----- | :------- | :----------- |
| `id`   | `string` | Id công việc |

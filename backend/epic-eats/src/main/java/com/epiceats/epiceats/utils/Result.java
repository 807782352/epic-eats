package com.epiceats.epiceats.utils;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Result<T> {

    private Integer code;   // code: 1 - success, 0 - fail
    private String errMsg;
    private T data;

    public static <T> Result<T> success(T data) {
        Result<T> result = new Result<>();
        result.code = 1;
        result.data = data;
        return result;
    }

    public static <T> Result<T> error(String errMsg){
        Result<T> result = new Result<>();
        result.code = 0;
        result.errMsg = errMsg;
        return result;
    }
}

import React, { useState } from "react";
import ModalContainer from "../../ModalContainer";
import Title from "../../Title";
import Input from "../../Input";
import Button from "../../Button";
import Message from "../../Message";
import { useQueryClient, useMutation } from "react-query";
import { StButtonContainer } from "../styled";
import { login } from "../../../../api/API";
import { useNavigate } from "react-router-dom";

const ModalLogin = (props) => {
    const navigate = useNavigate();
    const { onClose } = props;
    const [errMsg, SetErrMsg] = useState("");
    const [input, SetInput] = useState({
        userId: "",
        password: "",
    });
    // API 통신
    const queryClient = useQueryClient();
    const { mutate } = useMutation(login, {
        onSuccess: (data) => {
            console.log(data);
            queryClient.setQueryData("user", data);
            window.alert(`환영합니다!`)
            onClose();
            navigate("/dashboard/manito");
        },
        onError: (error) => {
            console.log(error);
            SetErrMsg(error.message);
        },
    });

    /** 로그인 input state 처리 함수 */
    const handleInput = (e) => {
        SetInput({
            ...input,
            [e.target.name]: e.target.value,
        }); 
        console.log("id: ", input.userId, "password: ", input.password);
    };

    const handleSubmit = () => {
        if(input.userId === "" || input.password === ""){
            alert("아이디와 비밀번호를 입력해주세요.");
            return;
        } else {
            console.log("로그인!");
            mutate(input);
        }
    };

    return (
        <ModalContainer onClose={onClose}>
            <Title>Login</Title>
            <div>
                <p>ID</p>
                <Input value={input.userId} name="userId" onChange={handleInput} type="text" placeholder="ID 입력해주세요!" />
                <p>비밀번호</p>
                <Input
                    value={input.password}
                    name="password"
                    onChange={handleInput}
                    type="password"
                    placeholder="password 입력해주세요!"
                />
            </div>
            <Message>{errMsg}</Message>
            <StButtonContainer>
                <Button handleBtnClick={handleSubmit}>로그인하기</Button>
            </StButtonContainer>
        </ModalContainer>
    );
};

export default ModalLogin;
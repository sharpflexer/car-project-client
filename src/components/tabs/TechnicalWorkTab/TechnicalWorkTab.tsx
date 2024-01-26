import { TimePicker, Typography } from "antd";
import dayjs, { Dayjs } from "dayjs";
import classes from "./TechnicalWorkTab.module.css";
import { useContext, useState } from "react";
import TechnicalWorkService from "../../../services/TechnicalWorkService";
import { useNavigate } from "react-router-dom";
import SocketContext from "../../../context/SocketContext";

function TechnicalWorkModal() {
    const [time, setTime] = useState<Dayjs | null>(null);
    const socket = useContext(SocketContext);
    const navigate = useNavigate();

    function timeout(delay: number) {
        return new Promise( res => setTimeout(res, delay) );
    }

    function startTechnicalWork(): void {
        if (time === null) {
            return;
        }
        socket.send("Authorization: " + localStorage.getItem("access_token"));
        TechnicalWorkService.StartTechnicalWork(time);
        timeout(5000)
        .then(() => navigate("/technicalWork"));
    }

    const onChange = (time: Dayjs | null) => {
        setTime(time);
    }

    return (
        <div className={classes.technicalWork}>
            <div className={classes.timepickerContainer}>
                <Typography.Title level={3}>
                    Выберите время окончания технических работ:
                </Typography.Title>
                <TimePicker format={"HH:mm"}
                    onChange={onChange}
                    presets={[
                        {
                            label: '5 минут',
                            value: dayjs().add(5, 'minute'),
                        },
                        {
                            label: '15 минут',
                            value: dayjs().add(15, 'minute'),
                        },
                        {
                            label: '30 минут',
                            value: dayjs().add(30, 'minute'),
                        },
                        {
                            label: '1 час',
                            value: dayjs().add(1, 'hour'),
                        },
                        {
                            label: '2 часа',
                            value: dayjs().add(2, 'hour'),
                        },
                        {
                            label: '6 часов',
                            value: dayjs().add(6, 'hour'),
                        },
                        {
                            label: '12 часов',
                            value: dayjs().add(12, 'hour'),
                        },
                    ]}
                />
            </div>
            <button className={classes.startTechnicalWork}
                onClick={startTechnicalWork}>
                Начать технические работы
            </button>
        </div>
    );
}

export default TechnicalWorkModal;
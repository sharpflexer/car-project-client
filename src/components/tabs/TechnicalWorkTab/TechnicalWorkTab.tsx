import { TimePicker, Typography } from "antd";
import dayjs, { Dayjs } from "dayjs";
import classes from "./TechnicalWorkTab.module.css";
import { useContext, useState } from "react";
import TechnicalWorkService from "../../../services/TechnicalWorkService";
import { useNavigate } from "react-router-dom";
import SocketContext from "../../../context/SocketContext";
import TimerPresets from "./TimerPresets";

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

    return (
        <div className={classes.technicalWork}>
            <div className={classes.timepickerContainer}>
                <Typography.Title level={3}>
                    Выберите время окончания технических работ:
                </Typography.Title>
                <TimePicker format={"HH:mm"}
                    onChange={(time: Dayjs | null) => {
                        setTime(time)}}
                    presets={TimerPresets()}
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
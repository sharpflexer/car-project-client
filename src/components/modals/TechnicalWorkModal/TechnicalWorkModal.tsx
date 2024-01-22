import { TimePicker, Typography } from "antd";
import dayjs, { Dayjs } from "dayjs";
import classes from "./TechnicalWorkModal.module.css";
import { useState } from "react";
import TechnicalWork from "../../../pages/TechnicalWork/TechnicalWork";
import TechnicalWorkService from "../../../services/TechnicalWorkService";
import { useNavigate } from "react-router-dom";

function TechnicalWorkModal() {
    const [time, setTime] = useState<Dayjs | null>(null);
    const navigate = useNavigate();

    function startTechnicalWork(): void {
        if (time === null) {
            return;
        }
        TechnicalWorkService.StartTechnicalWork(time)
            .then(result => result ? navigate("/technicalWork")
                : () => { });

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
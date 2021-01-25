import React, { useEffect, useState } from 'react'
import api from '../../../api';
import { BeepEntry } from '../../../types/Beep';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { Card } from '../../../components/Card';
import { Table, THead, TH, TBody, TR, TDText, TDButton, TDProfile } from '../../../components/Table';
import { Heading3 } from '../../../components/Typography';
import Pagination from '../../../components/Pagination';

dayjs.extend(duration);

function Beeps() {

    const [beeps, setBeeps] = useState<BeepEntry[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1),
        [resultCount, setResultCount] = useState<number>(0),
        pageLimit = 25;

    //async function fetchBeeps(page: number, limit: number) {
    async function fetchBeeps(page: number) {
        const { beeps, total } = await api.beeps.list(page, pageLimit);
        setBeeps(beeps);
        setResultCount(total);
    }

    useEffect(() => {
        fetchBeeps(0);
    }, []);

    return <>
        <Heading3>Beeps</Heading3>

        <Pagination
            resultCount={resultCount}
            limit={pageLimit}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            onPageChange={fetchBeeps}
        />
        <Card>
            <Table>
                <THead>
                    <TH>Beeper</TH>
                    <TH>Rider</TH>
                    <TH>Origin</TH>
                    <TH>Destination</TH>
                    <TH>Group Size</TH>
                    <TH>Start Time</TH>
                    <TH>End Time</TH>
                    <TH>Duration</TH>
                    <TH></TH>
                </THead>
                <TBody>
                    {beeps && (beeps).map(beepEntry => {
                        return (

                            <TR key={beepEntry.beep.id}>
                                <TDProfile
                                    to={`users/${beepEntry.beeper.id}`}
                                    photoUrl={beepEntry.beeper.photoUrl}
                                    title={`${beepEntry.beeper.first} ${beepEntry.beeper.last}`}
                                    subtitle={`@${beepEntry.beeper.username}`}>
                                </TDProfile>
                                <TDProfile
                                    to={`users/${beepEntry.rider.id}`}
                                    photoUrl={beepEntry.rider.photoUrl}
                                    title={`${beepEntry.rider.first} ${beepEntry.rider.last}`}
                                    subtitle={`@${beepEntry.rider.username}`}>
                                </TDProfile>
                                <TDText>{beepEntry.beep.origin}</TDText>
                                <TDText>{beepEntry.beep.destination}</TDText>
                                <TDText>{beepEntry.beep.groupSize}</TDText>
                                <TDText>{dayjs().to(beepEntry.beep.timeEnteredQueue)}</TDText>
                                <TDText>{dayjs().to(beepEntry.beep.doneTime)}</TDText>
                                <TDText>{dayjs.duration(beepEntry.beep.doneTime - beepEntry.beep.timeEnteredQueue).humanize()}</TDText>
                                <TDButton to={`beeps/${beepEntry.beep.id}`}>View</TDButton>
                            </TR>
                        )
                    })}
                </TBody>
            </Table>
        </Card>
        <Pagination
            resultCount={resultCount}
            limit={pageLimit}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            onPageChange={fetchBeeps}/>
    </>;
}

export default Beeps;

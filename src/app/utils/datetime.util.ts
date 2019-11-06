import * as moment from 'moment';


export class DatetimeUtil {
    /**
     * Converts epoch timestamp to 'YYYY-MM-DD hh:mm:ss'.
     *
     * @param timestamp
     */
    static convertTimestampToDateString(timestamp: number): string {
        return moment(timestamp).format('YYYY-MM-DD hh:mm:ss');
    }
}

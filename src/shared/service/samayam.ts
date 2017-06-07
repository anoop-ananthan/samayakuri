export class Samayam {
  private date: Date

  constructor() { }

  convertToDateString(date: Date = new Date()): string {
    this.date = date || this.date || new Date();
    let day = this.padLeftWithZero(this.date.getDate());
    let month = this.padLeftWithZero(this.date.getMonth() + 1);
    let year = this.date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  convertToTimeString(date: Date = new Date()): string {
    this.date = date || this.date || new Date();
    let hour = this.padLeftWithZero(this.date.getHours());
    let mins = this.padLeftWithZero(this.date.getMinutes());
    return `${hour}:${mins}`;
  }

  private padLeftWithZero(value): String {
    var s = value + "";
    while (s.length < 2) s = "0" + s;
    return s;
  }

  convertSecondsToHourMinFormat(milliseconds): string {
    let formattedTimeSpan = new Date(milliseconds).toISOString().substr(11, 8);
    let timeSplit = formattedTimeSpan.split(":");
    let hour = parseInt(timeSplit[0]);
    let mins = timeSplit[1];
    if (hour === 12) hour = 0;
    return `${hour}:${mins}`;
  }

  addTimeSpanToDate(date: Date = new Date(), hour: number = 0, mins: number = 0): Date {
    date.setHours(date.getHours() + hour);
    date.setMinutes(date.getMinutes() + mins);
    return date;
  }
}
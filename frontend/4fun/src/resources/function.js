import { IoFootstepsOutline } from "react-icons/io5";

export function timeFormatter(time) { 
    let hour = Math.floor(time / 3600);
    let minute = Math.floor((time - hour * 3600) / 60);
    let second = time - hour * 3600 - minute * 60;
    return (hour < 10 ? "0" : "") + hour + " : " + (minute < 10 ? "0" : "") + minute + " : " + (second < 10 ? "0" : "") + second;
}

export function goalTranslater(num) { 
    switch (num) {
        case 1:
            return { name: "Beginner", id: 1, repxsets: "3 sets x 5 reps", icon: IoFootstepsOutline, selected: true }
        case 2:
            return { name: "Intermediate", id: 2, repxsets: "4 sets x 8 reps", icon: IoFootstepsOutline, selected: false }
        case 3:
            return { name: "Advanced", id: 3, repxsets: "5 sets x 10 reps", icon: IoFootstepsOutline, selected: false }
        case 4:
            return { name: "Expert", id: 4, repxsets: "10 sets x 10 reps", icon: IoFootstepsOutline, selected: false }
        default:
            return { name: "Beginner", id: 1, repxsets: "3 sets x 5 reps", icon: IoFootstepsOutline, selected: true }
    }
}

export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
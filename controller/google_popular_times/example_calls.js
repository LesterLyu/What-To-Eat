/**
 * Example calls of
 * @type json
 */
const example =
    [
        [7, [ // sunday
            [6, 0, "", "None", "6 AM"],
            [7, 0, "", "None", "7 AM"],
            [8, 0, "", "None", "8 AM"],
            [9, 0, "", "None", "9 AM"],
            [10, 0, "", "None", "10 AM"],
            [11, 5, "Usually not too busy", "Up to 15 mins", "11 AM"],
            [12, 20, "Usually not too busy", "Up to 15 mins", "12 PM"],
            [13, 37, "Usually not too busy", "Up to 15 mins", "1 PM"],
            [14, 33, "Usually not too busy", "Up to 15 mins", "2 PM"],
            [15, 15, "Usually not too busy", "Up to 15 mins", "3 PM"],
            [16, 12, "Usually not too busy", "Up to 15 mins", "4 PM"],
            [17, 31, "Usually not too busy", "Up to 15 mins", "5 PM"],
            [18, 64, "Usually not too busy", "Up to 15 mins", "6 PM"],
            [19, 87, "Usually as busy as it gets", "Up to 15 mins", "7 PM"],
            [20, 77, "Usually not too busy", "Up to 15 mins", "8 PM"],
            [21, 46, "Usually not too busy", "Up to 15 mins", "9 PM"],
            [22, 17, "Usually not too busy", "Up to 15 mins", "10 PM"],
            [23, 0, "", "None", "11 PM"]
        ], 0, ["Peak wait up to 15 mins from 3:30 PM–11:00 PM", [
            [16, 23, [
                [5]
            ]]
        ]]],
        [1, [ // monday
            [6, 0, "", "None", "6 AM"],
            [7, 0, "", "None", "7 AM"],
            [8, 0, "", "None", "8 AM"],
            [9, 0, "", "None", "9 AM"],
            [10, 0, "", "None", "10 AM"],
            [11, 1, "Usually not too busy", "Up to 15 mins", "11 AM"],
            [12, 8, "Usually not too busy", "Up to 15 mins", "12 PM"],
            [13, 10, "Usually not busy", "None", "1 PM"],
            [14, 7, "Usually not too busy", "Up to 15 mins", "2 PM"],
            [15, 10, "Usually not too busy", "Up to 15 mins", "3 PM"],
            [16, 12, "Usually not busy", "None", "4 PM"],
            [17, 23, "Usually not too busy", "Up to 15 mins", "5 PM"],
            [18, 42, "Usually not too busy", "Up to 15 mins", "6 PM"],
            [19, 52, "Usually not too busy", "Up to 15 mins", "7 PM"],
            [20, 40, "Usually not too busy", "Up to 15 mins", "8 PM"],
            [21, 19, "Usually not too busy", "Up to 15 mins", "9 PM"],
            [22, 5, "Usually not too busy", "Up to 15 mins", "10 PM"],
            [23, 0, "", "None", "11 PM"]
        ], 0, ["Peak wait up to 15 mins from 5:30 PM–10:30 PM", [
            [16, 23, [
                [5]
            ]]
        ]]],
        [2, [ // tuesday
            [6, 0, "", "None", "6 AM"],
            [7, 0, "", "None", "7 AM"],
            [8, 0, "", "None", "8 AM"],
            [9, 0, "", "None", "9 AM"],
            [10, 0, "", "None", "10 AM"],
            [11, 5, "Usually not too busy", "Up to 15 mins", "11 AM"],
            [12, 12, "Usually not too busy", "Up to 15 mins", "12 PM"],
            [13, 15, "Usually not busy", "None", "1 PM"],
            [14, 11, "Usually not busy", "None", "2 PM"],
            [15, 9, "Usually not busy", "None", "3 PM"],
            [16, 14, "Usually not busy", "None", "4 PM"],
            [17, 25, "Usually not too busy", "None", "5 PM"],
            [18, 35, "Usually not too busy", "Up to 15 mins", "6 PM"],
            [19, 38, "Usually not too busy", "Up to 15 mins", "7 PM"],
            [20, 33, "Usually not too busy", "Up to 15 mins", "8 PM"],
            [21, 22, "Usually not too busy", "Up to 15 mins", "9 PM"],
            [22, 11, "Usually not too busy", "Up to 15 mins", "10 PM"],
            [23, 0, "", "None", "11 PM"]
        ], 0, ["Peak wait up to 15 mins from 6:00 PM–11:00 PM", [
            [16, 23, [
                [5]
            ]]
        ]]],
        [3, [ // wednesday
            [6, 0, "", "None", "6 AM"],
            [7, 0, "", "None", "7 AM"],
            [8, 0, "", "None", "8 AM"],
            [9, 0, "", "None", "9 AM"],
            [10, 0, "", "None", "10 AM"],
            [11, 7, "Usually not too busy", "Up to 15 mins", "11 AM"],
            [12, 15, "Usually not busy", "None", "12 PM"],
            [13, 17, "Usually not busy", "None", "1 PM"],
            [14, 12, "Usually not too busy", "Up to 15 mins", "2 PM"],
            [15, 8, "Usually not too busy", "Up to 15 mins", "3 PM"],
            [16, 12, "Usually not busy", "None", "4 PM"],
            [17, 28, "Usually not too busy", "Up to 15 mins", "5 PM"],
            [18, 51, "Usually not too busy", "Up to 15 mins", "6 PM"],
            [19, 69, "Usually not too busy", "Up to 15 mins", "7 PM"],
            [20, 68, "Usually not too busy", "Up to 15 mins", "8 PM"],
            [21, 48, "Usually not too busy", "Up to 15 mins", "9 PM"],
            [22, 24, "Usually not too busy", "Up to 15 mins", "10 PM"],
            [23, 0, "", "None", "11 PM"]
        ], 0, ["Peak wait up to 15 mins from 5:00 PM–11:00 PM", [
            [16, 23, [
                [5]
            ]]
        ]]],
        [4, [ // thursday
            [6, 0, "", "None", "6 AM"],
            [7, 0, "", "None", "7 AM"],
            [8, 0, "", "None", "8 AM"],
            [9, 0, "", "None", "9 AM"],
            [10, 0, "", "None", "10 AM"],
            [11, 1, "Usually not too busy", "Up to 15 mins", "11 AM"],
            [12, 5, "Usually not too busy", "Up to 15 mins", "12 PM"],
            [13, 12, "Usually not busy", "None", "1 PM"],
            [14, 15, "Usually not too busy", "Up to 15 mins", "2 PM"],
            [15, 12, "Usually not too busy", "Up to 15 mins", "3 PM"],
            [16, 11, "Usually not too busy", "Up to 15 mins", "4 PM"],
            [17, 23, "Usually not too busy", "Up to 15 mins", "5 PM"],
            [18, 47, "Usually not too busy", "Up to 15 mins", "6 PM"],
            [19, 72, "Usually not too busy", "Up to 15 mins", "7 PM"],
            [20, 76, "Usually not too busy", "Up to 15 mins", "8 PM"],
            [21, 56, "Usually not too busy", "Up to 15 mins", "9 PM"],
            [22, 29, "Usually not too busy", "Up to 15 mins", "10 PM"],
            [23, 0, "", "None", "11 PM"]
        ], 0, ["Peak wait up to 15 mins from 5:30 PM–11:00 PM", [
            [16, 23, [
                [5]
            ]]
        ]]],
        [5, [ // friday
            [6, 0, "", "None", "6 AM"],
            [7, 0, "", "None", "7 AM"],
            [8, 0, "", "None", "8 AM"],
            [9, 0, "", "None", "9 AM"],
            [10, 0, "", "None", "10 AM"],
            [11, 0, "", "Up to 15 mins", "11 AM"],
            [12, 5, "Usually not too busy", "Up to 15 mins", "12 PM"],
            [13, 23, "Usually not too busy", "None", "1 PM"],
            [14, 21, "Usually not too busy", "None", "2 PM"],
            [15, 6, "Usually not busy", "None", "3 PM"],
            [16, 10, "Usually not busy", "None", "4 PM"],
            [17, 35, "Usually not too busy", "Up to 15 mins", "5 PM"],
            [18, 71, "Usually not too busy", "Up to 15 mins", "6 PM"],
            [19, 91, "Usually as busy as it gets", "Up to 15 mins", "7 PM"],
            [20, 80, "Usually busy", "Up to 30 mins", "8 PM"],
            [21, 61, "Usually not too busy", "Up to 15 mins", "9 PM"],
            [22, 41, "Usually not too busy", "Up to 15 mins", "10 PM"],
            [23, 0, "", "None", "11 PM"]
        ], 0, ["Peak wait up to 30 mins from 8:00 PM–9:00 PM", [
            [16, 23, [
                [5]
            ]]
        ]]],
        [6, [ // saturday
            [6, 0, "", "None", "6 AM"],
            [7, 0, "", "None", "7 AM"],
            [8, 0, "", "None", "8 AM"],
            [9, 0, "", "None", "9 AM"],
            [10, 0, "", "None", "10 AM"],
            [11, 5, "Usually not too busy", "Up to 15 mins", "11 AM"],
            [12, 18, "Usually not too busy", "Up to 15 mins", "12 PM"],
            [13, 38, "Usually not too busy", "Up to 15 mins", "1 PM"],
            [14, 43, "Usually not too busy", "Up to 15 mins", "2 PM"],
            [15, 28, "Usually not too busy", "Up to 15 mins", "3 PM"],
            [16, 19, "Usually not too busy", "Up to 15 mins", "4 PM"],
            [17, 33, "Usually not too busy", "Up to 15 mins", "5 PM"],
            [18, 65, "Usually not too busy", "Up to 15 mins", "6 PM"],
            [19, 96, "Usually busy", "Up to 30 mins", "7 PM"],
            [20, 100, "Usually busy", "Up to 30 mins", "8 PM"],
            [21, 72, "Usually busy", "Up to 30 mins", "9 PM"],
            [22, 37, "Usually not too busy", "Up to 15 mins", "10 PM"],
            [23, 0, "", "None", "11 PM"]
        ], 0, ["Peak wait up to 30 mins from 7:30 PM–10:00 PM", [
            [16, 23, [
                [5]
            ]]
        ]]]
    ];
#!/bin/bash
declare -a process_arr_1=("LANGUAGE=te npm run build &" "LANGUAGE=bn npm run build &" "LANGUAGE=gu npm run build &" "LANGUAGE=hi npm run build &" )
declare -a process_arr_2=("LANGUAGE=kn npm run build &" "LANGUAGE=ml npm run build &" "LANGUAGE=mr npm run build &" "LANGUAGE=ta npm run build &" )

#declare -a process_arr_1=("echo \" sachin 1\" " "echo \" sachin 2\" " "echo \" sachin 3\" ")
#declare -a process_arr_2=("echo \" sachin 4 \" ")

total_size=$((${#process_arr_1[@]}+${#process_arr_2[@]}))

for (( i = 0; i < ${#process_arr_1[@]} ; i++ )); do
    printf "\n**** Running: ${process_arr_1[$i]} *****\n\n"
    eval "${process_arr_1[$i]}"
    pids[${i}]=$!
done

# wait for all pids
for (( i = 0; i < ${#pids[@]} ; i++ )); do
    pid=${pids[$i]}
    wait ${pid}
    exit_code=$?
    if [ "$exit_code" -gt "0" ]
    then
        printf "\n error in ${pid} status code ${exit_code} \n"
        exit 1
    else
        printf "\n done with ${pid} status code ${exit_code} \n"
        next_index=$((${#process_arr_1[@]}+${i}))
        if [ "$next_index" -lt "${total_size}" ]
        then
            printf "\n**** Running: ${process_arr_2[$i]} *****\n\n"
            eval "${process_arr_2[$i]}"
            pids[${next_index}]=$!
            printf "\n starting another process ${process_arr_1[$i]} \n"
        fi
    fi
done

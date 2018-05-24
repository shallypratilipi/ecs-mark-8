#!/bin/bash
declare -a process_arr_1=("LANGUAGE=te npm run build &" "LANGUAGE=bn npm run build &" "LANGUAGE=gu npm run build &" "LANGUAGE=hi npm run build &" "LANGUAGE=kn npm run build &" "LANGUAGE=ml npm run build &" "LANGUAGE=mr npm run build &" "LANGUAGE=ta npm run build &" )

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
        printf "\n command  ${process_arr_1[$i]} \n"
        exit 1
    else
        printf "\n done with ${pid} status code ${exit_code} \n"
    fi
done

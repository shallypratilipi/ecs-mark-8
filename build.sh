#!/bin/bash
declare -a process_arr_1=("LANGUAGE=te npm run build &" "LANGUAGE=bn npm run build &" "LANGUAGE=gu npm run build &" "LANGUAGE=hi npm run build &" )
declare -a process_arr_2=("LANGUAGE=kn npm run build &" "LANGUAGE=ml npm run build &" "LANGUAGE=mr npm run build &" "LANGUAGE=ta npm run build &" )

for (( i = 0; i < ${#process_arr_1[@]} ; i++ )); do
    printf "\n**** Running: ${process_arr_1[$i]} *****\n\n"
    eval "${process_arr_1[$i]}"
    pids[${i}]=$!
done

# wait for all pids
for pid in ${pids[*]}; do
    wait $pid
done

echo "done running te bn gu hi builds"

for (( i = 0; i < ${#process_arr_2[@]} ; i++ )); do
    printf "\n**** Running: ${process_arr_2[$i]} *****\n\n"
    eval "${process_arr_2[$i]}"
    pids[${i}]=$!
done

# wait for all pids
for pid in ${pids[*]}; do
    wait $pid
done

echo "done running kn ml mr ta builds"
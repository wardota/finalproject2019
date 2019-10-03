variable=$1;


if [ $variable == green ]; then
	echo -e "${variable}  hijau"
	noop google-chrome https://google.com/
elif [ $variable == blue ]; then
	echo -e "${variable}  biru"
	curl -i -X POST 'http://127.0.0.1:3080/v2/projects/8f419e29-35f0-4c58-ac7f-9be4c97d737b/nodes/start' -d '{}'
	noop google-chrome https://youtube.com/
elif [ $variable == yellow ]; then
	echo -e "${variable}  kuning"
	noop google-chrome http://localhost:4200
elif [ $variable == orange ]; then
	echo -e "${variable}  oren"
	noop google-chrome http://localhost:3080
else
	echo -e "not in list"
fi

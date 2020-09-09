variable=$1;


if [ $variable == green ]; then
	echo -e "${variable}  hijau" > /home/dimas/color.txt
elif [ $variable == blue ]; then
	echo -e "${variable}  biru" > /home/dimas/color.txt
elif [ $variable == yellow ]; then
	echo -e "${variable}  kuning" > /home/dimas/color.txt
elif [ $variable == orange ]; then
	echo -e "${variable}  oren" > /home/dimas/color.txt
else
	echo -e "not in list" > /home/dimas/color.txt
fi

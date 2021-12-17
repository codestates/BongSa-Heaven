#!/bin/bash
cd /home/ubuntu/BongSa-Heaven/server

export ACCESS_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names ACCESS_SECRET --query Parameters[0].Value | sed 's/"//g')
export MONGODB_URI=$(aws ssm get-parameters --region ap-northeast-2 --names MONGODB_URI --query Parameters[0].Value | sed 's/"//g')
export REFRESH_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names REFRESH_SECRET  --query Parameters[0].Value | sed 's/"//g')
export REACT_APP_API_URI=$(aws ssm get-parameters --region ap-northeast-2 --names REACT_APP_API_URI --query Parameters[0].Value | sed 's/"//g')
export GOOGLE_CLIENT=$(aws ssm get-parameters --region ap-northeast-2 --names GOOGLE_CLIENT --query Parameters[0].Value | sed 's/"//g')
export GOOGLE_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names GOOGLE_SECRET --query Parameters[0].Value | sed 's/"//g')
export REDIRECT_URI=$(aws ssm get-parameters --region ap-northeast-2 --names REDIRECT_URI --query Parameters[0].Value | sed 's/"//g')
export ACCESS_KEY_ID=$(aws ssm get-parameters --region ap-northeast-2 --names ACCESS_KEY_ID --query Parameters[0].Value | sed 's/"//g')
export SECRET_KEY_ID=$(aws ssm get-parameters --region ap-northeast-2 --names SECRET_KEY_ID  --query Parameters[0].Value | sed 's/"//g')
export KAKAO_REDIRECT_URI=$(aws ssm get-parameters --region ap-northeast-2 --names KAKAO_REDIRECT_URI --query Parameters[0].Value | sed 's/"//g')
export NODEMAILER_USER=$(aws ssm get-parameters --region ap-northeast-2 --names NODEMAILER_USER --query Parameters[0].Value | sed 's/"//g')
export NODEMAILER_PASS=$(aws ssm get-parameters --region ap-northeast-2 --names NODEMAILER_PASS --query Parameters[0].Value | sed 's/"//g')
export KAKAO_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names KAKAO_SECRET --query Parameters[0].Value | sed 's/"//g')
export KAKAO_CLIENT=$(aws ssm get-parameters --region ap-northeast-2 --names KAKAO_CLIENT --query Parameters[0].Value | sed 's/"//g')
export HTTPS_PORT=$(aws ssm get-parameters --region ap-northeast-2 --names HTTPS_PORT --query Parameters[0].Value | sed 's/"//g')

authbind --deep -f pm2 start index.js

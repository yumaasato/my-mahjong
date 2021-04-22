FROM ruby:2.7.3

ENV LANG=C.UTF-8 \
  TZ=Asia/Tokyo

RUN apt-get update -qq && apt-get install -y nodejs default-mysql-client

RUN mkdir /app
WORKDIR /app
COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock
RUN bundle install 
COPY . /app

# Start the main process.
CMD ["rails", "server", "-b", "0.0.0.0"]
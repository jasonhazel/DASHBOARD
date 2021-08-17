FROM ruby:2.7.0 as base

RUN rm /bin/sh && ln -s /bin/bash /bin/sh &\
  curl https://deb.nodesource.com/setup_12.x | bash &&\
  curl https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -

RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list &&\
  apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs yarn

RUN mkdir -p /app
WORKDIR /app

FROM base as ruby-dependencies

COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock

RUN cd /app && bundle install

FROM ruby-dependencies as javascript-dependencies
COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock

RUN cd /app && yarn install --check-files 

FROM javascript-dependencies as app
COPY . /app

# ENV RAILS_ENV production
# ENV NODE_ENV production

RUN bundle exec rake assets:precompile

COPY entrypoint.sh /
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

EXPOSE 3000

CMD rails db:migrate && rails s -b 0.0.0.0

# CMD ["rails","server","-b","0.0.0.0"]
# CMD bundle exec puma -C config/puma.rb
# CMD agoo -p 3000 -f -d public
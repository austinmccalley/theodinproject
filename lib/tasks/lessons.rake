namespace :lessons do
  desc 'Prints Average Lesson Durations'
  task :average_duration, [:start_date, :end_date] => :environment do |task, args|
    start_date = DateTime.parse(args.start_date)
    end_date = DateTime.parse(args.end_date)
    duration_data = Course.all.map do |course|
      LessonCompletionDataSerializer.as_json(course, start_date, end_date).to_yaml
    end.join
    Rails.logger.info duration_data
  end
end